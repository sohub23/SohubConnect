<?php
declare(strict_types=1);

// Prevent framework interference
define('BASEPATH', true);

$allowedOrigins = [
    'https://connect.sohub.com.bd',
    'https://www.connect.sohub.com.bd',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? trim((string) $_SERVER['HTTP_ORIGIN']) : '';
$allowOrigin = in_array($origin, $allowedOrigins, true) ? $origin : 'https://connect.sohub.com.bd';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Access-Control-Allow-Origin: ' . $allowOrigin);
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Basic same-origin checks (accept missing origin/referrer for compatibility).
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Request blocked']);
    exit();
}

$referer = isset($_SERVER['HTTP_REFERER']) ? trim((string) $_SERVER['HTTP_REFERER']) : '';
if ($referer !== '') {
    $refererHost = (string) parse_url($referer, PHP_URL_HOST);
    if ($refererHost !== '' && $refererHost !== 'connect.sohub.com.bd' && $refererHost !== 'www.connect.sohub.com.bd') {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Request blocked']);
        exit();
    }
}

$maxPayloadBytes = 25 * 1024;
$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > $maxPayloadBytes) {
    http_response_code(413);
    echo json_encode(['success' => false, 'message' => 'Payload too large']);
    exit();
}

$rawInput = file_get_contents('php://input');
if ($rawInput === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit();
}
if (strlen($rawInput) > $maxPayloadBytes) {
    http_response_code(413);
    echo json_encode(['success' => false, 'message' => 'Payload too large']);
    exit();
}

$data = json_decode($rawInput, true);
if (!is_array($data)) {
    $data = $_POST;
}
if (!is_array($data)) {
    $data = [];
}

$name = isset($data['name']) ? trim((string) $data['name']) : '';
$email = isset($data['email']) ? trim((string) $data['email']) : '';
$phone = isset($data['phone']) ? trim((string) $data['phone']) : '';
$message = isset($data['message']) ? trim((string) $data['message']) : '';

if ($name === '' || $email === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and phone are required']);
    exit();
}

if (strlen($name) < 2 || strlen($name) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid name']);
    exit();
}

if (!preg_match('/^[A-Za-z0-9 ]+$/', $name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name cannot contain special characters']);
    exit();
}

if (strlen($email) > 190 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

if (!preg_match('/^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}$/', $email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email format is invalid']);
    exit();
}

if (preg_match('/[\r\n]/', $name . $email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit();
}

if (!preg_match('/^[0-9]{6,15}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Phone must contain digits only']);
    exit();
}

if (strlen($message) > 2000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Message is too long']);
    exit();
}

if ($message !== '' && !preg_match('/^[A-Za-z0-9\\s]+$/', $message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Message cannot contain special characters']);
    exit();
}

// Lightweight per-IP rate limit.
$clientIp = isset($_SERVER['HTTP_CF_CONNECTING_IP']) ? (string) $_SERVER['HTTP_CF_CONNECTING_IP'] : ((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$rateKey = hash('sha256', $clientIp);
$rateFile = sys_get_temp_dir() . '/contact_rate_' . $rateKey . '.json';
$windowSeconds = 15 * 60;
$maxAttempts = 6;
$now = time();

$attempts = [];
$fp = @fopen($rateFile, 'c+');
if ($fp !== false) {
    if (flock($fp, LOCK_EX)) {
        $existing = stream_get_contents($fp);
        if (is_string($existing) && $existing !== '') {
            $decoded = json_decode($existing, true);
            if (is_array($decoded)) {
                $attempts = $decoded;
            }
        }

        $filtered = [];
        foreach ($attempts as $ts) {
            if (is_int($ts) && $ts >= ($now - $windowSeconds)) {
                $filtered[] = $ts;
            }
        }

        if (count($filtered) >= $maxAttempts) {
            flock($fp, LOCK_UN);
            fclose($fp);
            http_response_code(429);
            echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
            exit();
        }

        $filtered[] = $now;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($filtered));
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
}

// Honeypot field: bots usually fill hidden fields.
$honeypot = isset($data['website']) ? trim((string) $data['website']) : '';
if ($honeypot !== '') {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    exit();
}

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

$smtpUser = getenv('CONTACT_SMTP_USER') ?: '';
$smtpPass = getenv('CONTACT_SMTP_PASS') ?: '';
$adminRecipient = getenv('CONTACT_ADMIN_EMAIL') ?: '';

if ($smtpUser === '' || $smtpPass === '') {
    error_log('Contact form config error: SMTP credentials are missing.');
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Service temporarily unavailable. Please try again later.']);
    exit();
}

if ($adminRecipient === '') {
    $adminRecipient = $smtpUser;
}

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

try {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->SMTPDebug = 0;
    $mail->Timeout = 20;

    // Email to admin
    $mail->setFrom($smtpUser, 'SOHUB Connect Contact Form');
    $mail->addAddress($adminRecipient);
    $mail->addReplyTo($email, $name);
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission - SOHUB Connect';
    $mail->Body = "
        <html>
        <body style='margin:0; padding:0; background:#f3fdf6; font-family:Arial,Helvetica,sans-serif; color:#1f2937;'>
            <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background:#f3fdf6; padding:28px 12px;'>
                <tr>
                    <td align='center'>
                        <table role='presentation' width='640' cellspacing='0' cellpadding='0' style='max-width:640px; width:100%; background:#ffffff; border:1px solid #d1fae5; border-radius:14px; overflow:hidden;'>
                            <tr>
                                <td style='background:linear-gradient(135deg,#16a34a,#22c55e); padding:22px 26px; color:#ffffff;'>
                                    <h2 style='margin:0; font-size:22px; font-weight:700;'>New Contact Inquiry</h2>
                                    <p style='margin:8px 0 0 0; font-size:14px; opacity:0.95;'>SOHUB Connect website contact form submission</p>
                                </td>
                            </tr>
                            <tr>
                                <td style='padding:24px 26px 10px 26px;'>
                                    <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='border-collapse:collapse;'>
                                        <tr><td style='padding:8px 0; font-size:14px;'><strong>Name:</strong> {$safeName}</td></tr>
                                        <tr><td style='padding:8px 0; font-size:14px;'><strong>Email:</strong> {$safeEmail}</td></tr>
                                        <tr><td style='padding:8px 0; font-size:14px;'><strong>Phone:</strong> {$safePhone}</td></tr>
                                    </table>
                                    <div style='margin-top:14px; border:1px solid #dcfce7; background:#f0fdf4; border-radius:10px; padding:14px;'>
                                        <p style='margin:0 0 8px 0; font-size:13px; color:#166534; font-weight:700;'>Message</p>
                                        <p style='margin:0; font-size:14px; color:#374151; line-height:1.7;'>{$safeMessage}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style='padding:18px 26px 24px 26px;'>
                                    <p style='margin:0; font-size:12px; color:#6b7280;'>This notification was generated automatically from the SOHUB Connect contact form.</p>
                                    <p style='margin:8px 0 0 0; font-size:12px; color:#6b7280;'>Visit: <a href='https://connect.sohub.com.bd' style='color:#16a34a; text-decoration:none; font-weight:600;'>https://connect.sohub.com.bd</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    ";
    $mail->send();

    // Email to customer
    $mail->clearAddresses();
    $mail->clearReplyTos();
    $mail->addAddress($email, $name);
    $mail->Subject = 'Thank You for Contacting SOHUB Connect';
    $mail->Body = "
        <html>
        <body style='margin:0; padding:0; background:#f3fdf6; font-family:Arial,Helvetica,sans-serif; color:#1f2937;'>
            <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background:#f3fdf6; padding:28px 12px;'>
                <tr>
                    <td align='center'>
                        <table role='presentation' width='640' cellspacing='0' cellpadding='0' style='max-width:640px; width:100%; background:#ffffff; border:1px solid #d1fae5; border-radius:14px; overflow:hidden;'>
                            <tr>
                                <td style='background:linear-gradient(135deg,#15803d,#22c55e); padding:24px 26px; color:#ffffff;'>
                                    <h2 style='margin:0; font-size:22px; font-weight:700;'>Thank You for Contacting SOHUB Connect</h2>
                                    <p style='margin:8px 0 0 0; font-size:14px; opacity:0.95;'>We have received your message successfully.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style='padding:24px 26px 10px 26px;'>
                                    <p style='margin:0 0 12px 0; font-size:15px;'>Dear {$safeName},</p>
                                    <p style='margin:0 0 14px 0; font-size:14px; line-height:1.7; color:#374151;'>Thank you for reaching out to us. Our team has received your inquiry and will get back to you as soon as possible.</p>
                                    <div style='margin-top:10px; border:1px solid #dcfce7; background:#f0fdf4; border-radius:10px; padding:14px;'>
                                        <p style='margin:0 0 8px 0; font-size:13px; color:#166534; font-weight:700;'>Your Message</p>
                                        <p style='margin:0; font-size:14px; color:#374151; line-height:1.7;'>{$safeMessage}</p>
                                    </div>
                                    <p style='margin:16px 0 0 0; font-size:14px; line-height:1.7; color:#374151;'>For urgent support, please reply to this email and our team will prioritize your request.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style='padding:18px 26px 24px 26px; border-top:1px solid #ecfdf5;'>
                                    <p style='margin:0; font-size:13px; color:#4b5563; font-weight:600;'>Best regards,<br/>SOHUB Connect Team</p>
                                    <p style='margin:10px 0 0 0; font-size:12px; color:#6b7280;'>Visit: <a href='https://connect.sohub.com.bd' style='color:#16a34a; text-decoration:none; font-weight:600;'>https://connect.sohub.com.bd</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    ";
    $mail->send();

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} catch (Exception $e) {
    error_log('Contact form mail failure: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
