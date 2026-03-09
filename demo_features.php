<?php
    if (!$this->session->userdata('site_lang')) {
        $this->session->set_userdata('site_lang', 'bangla');
    }
    $lang = $this->input->get('lang');
    if ($lang) {
        $this->session->set_userdata('site_lang', $lang);
    }
    $site_lang = $this->session->userdata('site_lang');
?>


<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    letter-spacing: -0.011em;
    line-height: 1.5;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -0.015em;
    font-weight: 600;
  }

  p {
    margin-bottom: 1.25rem;
    font-size: 16px;
    line-height: 1.6;
  }

  .hero-heading {
    font-size: 42px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .hero-subline {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }
  .py-24 {
    padding-top: 0rem;
    padding-bottom: 6rem;
}

/* Add to your <style> section */
.start-btn {
  background-color: #457ec0;
  color: #fff;
  padding: 10px 28px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(69,126,192,0.10);
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s;
  display: inline-block;
}
.start-btn:hover, .start-btn:focus {
  background-color: #325c91;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 4px 16px 0 rgba(50,92,145,0.18);
}

  @media screen and (max-width: 768px) {
    .hero-heading {
      font-size: 28px !important;
      line-height: 1.3 !important;
    }
    .hero-subline {
      font-size: 14px !important;
      line-height: 1.4 !important;
    }
  }
</style>
<style>
  .btn-diagonal-bl-tr {
    position: relative;
    display: inline-block;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #457ec0;
    border-radius: 6px;
    text-decoration: none !important;
    overflow: hidden;
    z-index: 1;
  }

  .btn-diagonal-bl-tr:hover {
    text-decoration: none !important;
  }

  .btn-diagonal-bl-tr::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: black;
    transform: scale(0);
    transform-origin: bottom left;
    transition: transform 0.4s ease;
    z-index: 0;
    border-radius: 6px;
  }

  .btn-diagonal-bl-tr:hover::before {
    transform: scale(1);
  }

  .btn-diagonal-bl-tr span {
    position: relative;
    z-index: 2;
    color: white;
    text-decoration: none !important;
  }

  .btn-diagonal-bl-tr:hover span {
    color: white;
    text-decoration: none !important;
  }
.py-24 {
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
}


  
}

</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<section class="py-24 bg-gradient-to-r from-blue-50 to-blue-100 mb-16" data-aos="fade-up" style="margin-top: 80px;">
  <div class="max-w-7xl mx-auto px-6 text-center">
    <h2 class="text-4xl font-extrabold mb-6 leading-tight text-gray-800 transition-all duration-300 ease-in-out hover:text-blue-600">
      <?php echo ($site_lang == 'english') 
        ? 'Simplify Your Business Communication with SOHUB Connect' 
        : 'SOHUB Connect দিয়ে আপনার ব্যবসায়িক যোগাযোগ সহজ করুন'; ?>
    </h2>
    <p class="text-lg text-gray-600 mb-8 leading-relaxed">
	  <?php echo ($site_lang == 'english') 
		? 'SOHUB Connect is an easy-to-use phone and messaging system made for Modern businesses. It helps your business talk smoothly, save money, and grow easily.' 
		: 'SOHUB Connect একটি সহজে ব্যবহারযোগ্য ফোন এবং মেসেজিং সিস্টেম যা আধুনিক ব্যবসার জন্য তৈরি। এটি আপনার ব্যবসার যোগাযোগ সহজ করে, খরচ কমায় এবং সহজেই বাড়তে সাহায্য করে'; ?>
	</p>

    
    <!-- Button Section -->
    <div class="mt-8 flex justify-center">
      <a href="<?php echo base_url(); ?>about"
         class="block w-full sm:w-auto text-white text-base sm:text-lg font-medium px-6 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
         style="background-color: #457ec0; text-decoration: none;">
        <?= ($site_lang == 'english') ? 'Learn More About SOHUB Connect →' : 'SOHUB Connect সম্পর্কে আরও জানুন →'; ?>
      </a>
    </div>
  </div>
</section>







<!-------------------------------------------------------->


<section data-aos="fade-up" data-aos-duration="800">
<div style="max-width:920px;margin:40px auto;font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;color:#222;background:#fff; text-align:center; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">

<h1 style="font-weight:700; font-size:18px; margin-bottom:20px; text-align:center; color:#444;">
  <?php echo ($site_lang == 'english') 
    ? 'Explore SOHUB Connect Functionalities' 
    : 'এক নজরে SOHUB Connect’এর ফিচারসমূহ'; ?>
</h1>

  <!-- Business Communications tabs -->
<div id="business-tabs" style="background:#f9fafc;border-radius:12px 12px 0 0;padding:0 20px;border:1px solid #d7dce6;border-bottom:none;display:flex;gap:30px;font-size:13px;color:#8a8a8a;font-weight:600;user-select:none;margin-bottom:0;flex-wrap:wrap;" data-aos="fade-in" data-aos-duration="600">
<div data-tab="call-efficiency" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:all 0.3s;" data-aos="fade-in" data-aos-delay="50">
  <?php echo ($site_lang == 'english') ? 'Call Flow' : 'কল ফ্লো'; ?>
</div>

<div data-tab="work-anywhere" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:all 0.3s;" data-aos="fade-in" data-aos-delay="100">
  <?php echo ($site_lang == 'english') ? 'Extensions' : 'এক্সটেনশনসমূহ'; ?>
</div>


<div data-tab="unified-communications" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:all 0.3s;" data-aos="fade-in" data-aos-delay="150">
  <?php echo ($site_lang == 'english') ? 'Ring Groups' : 'রিং গ্রুপ্স'; ?>
</div>



<div data-tab="cug" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:all 0.3s;" data-aos="fade-in" data-aos-delay="200">
  <?php echo ($site_lang == 'english') ? 'Closed User Group' : 'ক্লোজড ইউজার গ্রুপ'; ?>
</div>



<div data-tab="sound-file" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:all 0.3s;" data-aos="fade-in" data-aos-delay="250">
  <?php echo ($site_lang == 'english') ? 'Custom Audio' : 'কাস্টম অডিও'; ?>
</div>

<div data-tab="tts" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:all 0.3s;" data-aos="fade-in" data-aos-delay="300">
  <?php echo ($site_lang == 'english') ? 'Text to Speech' : 'টেক্সট টু স্পিচ'; ?>
</div>


<div data-tab="caller-id" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:all 0.3s;" data-aos="fade-in" data-aos-delay="350">
  <?php echo ($site_lang == 'english') ? 'Hotline & Call Routing' : 'হটলাইন ও কল রাউটিং'; ?>
</div>

</div>

<!-- Ring Groups Section -->
<div id="work-anywhere-content" class="tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none;" data-aos="fade-up" data-aos-duration="600">
  <div class="ring-group-flex" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="ring-group-text" style="flex:1; min-width:280px;" data-aos="fade-right" data-aos-delay="100">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Easily Create and Manage User Extensions Without Any Hassle' 
      : 'ইউজার এক্সটেনশন তৈরি ও ম্যানেজ করুন কোনরকম ঝামেলা ছাড়াই'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Auto Extension Numbering – New extensions are assigned numbers automatically' 
      : 'অটো এক্সটেনশন- নতুন নম্বরের জন্য এক্সটেনশন নির্ধারণ হয় স্বয়ংক্রিয়ভাবে'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Personalized Extension Naming – Assign extensions based on employee name, ID, or department' 
      : 'পার্সোনালাইজড এক্সটেনশন- অফিসের কর্মীর নাম, আইডি অথবা ডিপার্টমেন্ট অনুযায়ী এক্সটেনশন নির্ধারণের সুবিধা'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="300">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		<?php echo ($site_lang == 'english') 
      ? 'One-Click Activation – Just save, and your new extension is instantly activated!' 
      : 'ওয়ান ক্লিক অ্যাকটিভেশন- শুধু সেভ করলেই নতুন এক্সটেনশনটি চালু হয়ে যাবে'; ?>

		</li>
	  </ul>
	</div>

    <!-- Right Side Slider -->
    <div class="ring-group-slider" style="flex:1; min-width:280px; max-width:500px; margin:0 auto;" data-aos="fade-left" data-aos-delay="200">
      <div class="swiper-container ring-group-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/extension1.png" alt="Ring Group Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/extension2.png" alt="Ring Group Slide 2" style="width:100%; display:block;" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>






<!-- Ring Groups Section -->
<div id="unified-communications-content" class="tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none;" data-aos="fade-up" data-aos-duration="600">
  <div class="ring-group-flex" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="ring-group-text" style="flex:1; min-width:280px;" data-aos="fade-right" data-aos-delay="100">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Easily forward incoming calls to one or multiple agents using smart ring strategies tailored to your business.' 
      : 'স্মার্ট রিং স্ট্র্যাটেজি ব্যবহার করে আপনার প্রতিষ্ঠানের ইনকামিং কলগুলোকে এক বা একের অধিক এজেন্টের কাছে ফরওয়ার্ড করুন কোন ধরনের ঝামেলা ছাড়ায়'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Auto Extension Numbering – Extensions are automatically assigned as soon as a new number is added' 
      : 'অটো এক্সটেনশন: নতুন নম্বর যুক্ত হলেই স্বয়ংক্রিয়ভাবে এক্সটেনশন নির্ধারণ হয়ে যায়'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		<?php echo ($site_lang == 'english') 
      ? 'Personalized Extension Naming – Customize extensions based on name, ID, or department' 
      : ' পার্সোনালাইজড এক্সটেনশন: নাম, আইডি বা বিভাগের ভিত্তিতে কর্মীদের জন্য এক্সটেনশন কাস্টমাইজড করার সুবিধা'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="300">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
	<?php echo ($site_lang == 'english') 
      ? 'One-Click Activation – Just save, and the extension will be activated automatically.' 
      : ' ওয়ান-ক্লিক অ্যাকটিভেশন: শুধু সেভ করলেই এক্সটেনশনটি স্বয়ংক্রিয়ভাবে চালু হয়ে যাবে'; ?>

		</li>
	  </ul>
	</div>


    <!-- Right Side Slider -->
    <div class="ring-group-slider" style="flex:1; min-width:280px; max-width:500px; margin:0 auto;" data-aos="fade-left" data-aos-delay="200">
      <div class="swiper-container ring-group-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/ring_group1.png" alt="Ring Group Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/ring_group2.png" alt="Ring Group Slide 2" style="width:100%; display:block;" />
          </div>
        
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>




<!-- Closed User Group (CUG) Section -->
<div id="cug-content" class="tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none;" data-aos="fade-up" data-aos-duration="600">
  <div class="cug-flex-container" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="cug-text" style="flex:1; min-width:280px;" data-aos="fade-right" data-aos-delay="100">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
	<?php echo ($site_lang == 'english') 
      ? 'With CUG, securely forward calls to specific numbers — safely and confidently.' 
      : 'CUG ব্যবহারে নির্দিষ্ট নম্বরে কল ফরওয়ার্ড করুন নিরাপদে, নিশ্চিন্তে'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Connect Verified Numbers – Register trusted mobile or external numbers for secure call forwarding' 
      : ' ভেরিফাইড নম্বর কানেক্ট: রেজিস্টার করুন নিরাপদ কল ফরওয়ার্ডিং মোবাইল নম্বরগুলোকে'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
	<?php echo ($site_lang == 'english') 
      ? 'Use in Call Flow – Easily forward calls to CUG numbers within your inbound routing setup' 
      : ' কল ফ্লোতেও ব্যাবহার: খুব সহজেই কল ফরওয়ার্ড করুন ইনবাউন্ড রাউটিং সেটআপেই'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="250">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Enhanced Control – Limit call forwarding to only verified and authorized contacts as needed' 
      : ' সামগ্রিক নিয়ন্ত্রণ: চাহিদামতো কল ফরওয়ার্ডিং সীমাবদ্ধ রাখুন শুধুমাত্র ভেরিফাইড এবং অনুমোদিত কন্টাক্টদেরকেই'; ?>

		</li>
	  </ul>
	</div>

    
    <!-- Right Side Slider -->
    <div class="cug-slider" style="flex:1; min-width:280px; max-width:500px; margin: 0 auto;" data-aos="fade-left" data-aos-delay="200">
      <div class="swiper-container" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/cug1.png" alt="CUG Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/cug2.png" alt="CUG Slide 2" style="width:100%; display:block;" />
          </div>
         
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>


<!-- Call Flow (IVR Management) Section -->
<div id="call-efficiency-content" class="tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;" data-aos="fade-up" data-aos-duration="600">
  <div class="call-efficiency-flex" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
		<!-- Left Text Block -->
	   <div class="call-efficiency-text" style="flex:1; min-width:280px;" data-aos="fade-right" data-aos-delay="100">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		  <?php echo ($site_lang == 'english') 
			? 'Deliver a professional calling experience with SOHUB Connect’s smart IVR — no hardware or setup hassle.' 
			: 'SOHUB Connect এর স্মার্ট IVR ব্যবস্থার মাধ্যমে হার্ডওয়্যার বা ঝামেলাবিহীন প্রফেশনাল কলিং অভিজ্ঞতা উপভোগ করুন'; ?>
	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Custom Welcome Messages – Set your own audio recordings or personalized greetings to welcome callers' 
      : ' কাস্টম ওয়েলকাম মেসেজ – আপনার ব্যক্তিগত অডিও রেকর্ডিং অথবা নিজের পছন্দমতো যেকোনো কাস্টম ওয়েলকাম মেসেজ সেট করতে পারবেন'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		<?php echo ($site_lang == 'english') 
      ? 'Interactive Voice Menus – Allow callers to choose options like “Press 1 for Sales, Press 2 for Support”' 
      : ' ইন্টারেক্টিভ ভয়েস মেনু – কলারকে তার নিজের পছন্দমতো বাছায় করার সুযোগ দিন, যেমন- ‘সেলসের জন্য ১ চাপুন, সাপোর্টের জন্য ২ চাপুন’'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="250">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		<?php echo ($site_lang == 'english') 
      ? 'Smart Call Transfers – Automatically route callers to the right team or extension based on their needs' 
      : ' স্মার্ট কল ট্র্যান্সফার – ব্যবহারকারীর চাহিদামতো স্বয়ংক্রিয়ভাবে সঠিক টিম বা এক্সটেনশনে ট্র্যান্সফারের সুবিধা'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="300">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Playback Audio Messages – Announce updates, business hours, or other important information through audio' 
      : ' অডিও প্লেব্যাক – নিজেদের যেকোনো আপডেট অথবা অফিসের চলমান সময়সূচী ঘোষণা করুন অডিও প্লেব্যাকের মাধ্যমে'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="350">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'CUG & Ring Group Integration – Forward calls using specific verified numbers and smart ring strategies' 
      : ' CUG ও রিং গ্রুপ ইন্টিগ্রেশন – নির্দিষ্ট ভেরিফাইড নম্বর ও রিং স্ট্র্যাটেজি ব্যবহার করে কল ফরোয়ার্ডের ব্যবস্থা'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="400">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Fully Web-Based – Create, update, and manage your entire call flow from anywhere in the country' 
      : ' ওয়েব বেইজড – কল ফ্লো তৈরি, পরিবর্তন ও ম্যানেজ করুন দেশের যেকোনো প্রান্ত থেকে'; ?>

		</li>
	  </ul>

	  <p style="font-size:14px; color:#333; margin-top:20px;">
		<?php echo ($site_lang == 'english') 
      ? 'Ensure fast, accurate, and professional responses—right from the first ring.' 
      : 'প্রথম রিং/কলেই নিশ্চিত করুণ দ্রুত, নির্ভুল এবং প্রফেশনাল রেসপন্স'; ?>

	  </p>
	</div>


    <!-- Right Side Slider -->
    <div class="call-efficiency-slider" style="flex:1; min-width:280px; max-width:500px;" data-aos="fade-left" data-aos-delay="200">
      <div class="swiper-container call-efficiency-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/call_flow1.png" alt="IVR Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/call_flow2.png" alt="IVR Slide 2" style="width:100%; display:block;" />
          </div>
         
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</div>



 <!-- Ring Groups Section -->
<div id="sound-file-content" class="tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none;" data-aos="fade-up" data-aos-duration="600">
  <div class="ring-group-flex" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="ring-group-text" style="flex:1; min-width:280px;" data-aos="fade-right" data-aos-delay="100">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Record Your Own Voice for Call Flows to Boost Customer Satisfaction' 
      : 'কল ফ্লোতে নিজের কণ্ঠে অডিও রেকর্ড করে কাস্টমারদের সন্তুষ্টি বৃদ্ধি করুন'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Record Your Own Voice – Create and upload custom welcome messages, menu prompts, or announcements for your callers' 
      : 'নিজের কণ্ঠে ভয়েস রেকর্ড: ওয়েলকাম ম্যাসেজ, মেন্যু, দিকনির্দেশনা অথবা যেকোনো ঘোষণা রেকর্ড করে কাস্টমারদেরকে শুনান'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Use Immediately After Upload – Your voice recording becomes instantly available in the call flow as soon as it’s uploaded' 
      : 'আপলোডের সঙ্গে সঙ্গে ব্যবহার: আপনার নিজের ভয়েস রেকর্ড আপলোড করার সঙ্গে সঙ্গেই সেটি কল ফ্লো যুক্ত হয়ে ইউজার/কাস্টমার সেটি উপভোগ করতে পারবে'; ?>

		</li>
	  </ul>
	</div>

    <!-- Right Side Slider -->
    <div class="ring-group-slider" style="flex:1; min-width:280px; max-width:500px; margin:0 auto;" data-aos="fade-left" data-aos-delay="200">
      <div class="swiper-container ring-group-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/sound1.png" alt="Ring Group Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/sound2.png" alt="Ring Group Slide 2" style="width:100%; display:block;" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>



<!-- Ring Groups Section -->
<div id="tts-content" class="tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none;" data-aos="fade-up" data-aos-duration="600">
  <div class="ring-group-flex" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="ring-group-text" style="flex:1; min-width:280px;" data-aos="fade-right" data-aos-delay="100">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'AI-Generated Audio – Create voice prompts from text without recording your own voice' 
      : 'নিজের কণ্ঠে ভয়েস রেকর্ডিং ছাড়াও টেক্সটের মাধ্যমে এআই জেনারেটেড অডিও তৈরি করার সুবিধা'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Text-to-Speech – Instantly convert your written Bangla or English text into voice using TTS technology' 
      : 'আপনার লিখিত বাংলা অথবা ইংরেজি টেক্সটকে ভয়েসে রূপান্তরিত করুন টেক্সট টু স্পিচ ব্যবহারে'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
			? 'Use TTS for Call Flow – Easily incorporate voice into your call flow, from welcome messages to user input and announcements' 
			: 'টেক্সট টু স্পিচের আউটপুট ব্যবহার করতে পারবেন কল ফ্লোতেও। অর্থাৎ ওয়েলকাম মেসেজ থেকে শুরু করে ইউজার ইনপুট, মেনু সিলেকশন অথবা আপনার প্রতিষ্ঠানের যেকোনো বিজ্ঞপ্তি সবকিছু ভয়েসে রূপান্তর করতে পারবেন'; ?>
		</li>
	  </ul>
	</div>

    <!-- Right Side Slider -->
    <div class="ring-group-slider" style="flex:1; min-width:280px; max-width:500px; margin:0 auto;" data-aos="fade-left" data-aos-delay="200">
      <div class="swiper-container ring-group-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/tts1.png" alt="Ring Group Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/tts2.png" alt="Ring Group Slide 2" style="width:100%; display:block;" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>


<!-- Ring Groups Section -->
<div id="caller-id-content" class="tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none;" data-aos="fade-up" data-aos-duration="600">
  <div class="ring-group-flex" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="ring-group-text" style="flex:1; min-width:280px;" data-aos="fade-right" data-aos-delay="100">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Manage your hotline number and call flow from anywhere in the country using the SOHUB Connect Portal' 
      : 'SOHUB Connect পোর্টাল ব্যাবহার করে দেশের যেকোনো জায়গা থেকে পরিচালনা করুন আপনার হটলাইন নম্বর ও কল ফ্লো'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Select Your Preferred Number and Provider – Choose a number from your preferred IPTSP operator and complete the KYC form to get your hotline number' 
      : 'আপনার পছন্দের নম্বর এবং প্রভাইডার সিলেক্ট করে KYC ফরম পূরণ করে IPTSP থেকে হটলাইন নম্বর সংগ্রহ করুন'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Manage Multiple Hotline Numbers – Control all your hotline numbers from a single dashboard with ease' 
      : 'এক ড্যশবোর্ড থেকেই একাধিক হটলাইন নম্বর ম্যানেজ করুন'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align: left;" data-aos="fade-up" data-aos-delay="250">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Custom Call Flow for Each IPTSP Number – Set up individual call flows for each of your IPTSP numbers based on your specific needs' 
      : 'চাহিদামতো প্রত্যেকটি IPTSP নম্বরে আলাদা আলাদা কল ফ্লো তৈরির ব্যবস্থা'; ?>

		</li>
	  </ul>
	</div>

    <!-- Right Side Slider -->
    <div class="ring-group-slider" style="flex:1; min-width:280px; max-width:500px; margin:0 auto;" data-aos="fade-left" data-aos-delay="200">
      <div class="swiper-container ring-group-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/caller_id2.png" alt="Ring Group Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/caller_id2.png" alt="Ring Group Slide 2" style="width:100%; display:block;" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>


</section>



<script>
document.addEventListener("DOMContentLoaded", function () {
  const businessTabs = document.querySelectorAll('#business-tabs div');
  const allTabContents = document.querySelectorAll('.tab-content');

  // Show the matching tab content
  function showContent(id) {
    allTabContents.forEach(content => {
      content.style.display = (content.id === id) ? 'block' : 'none';
    });
  }

  // Setup tab switching
  businessTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;

      businessTabs.forEach(t => {
        t.style.color = '#8a8a8a';
        t.style.borderBottom = '3px solid transparent';
        t.classList.remove('active');
      });

      tab.style.color = '#0a1e38';
      tab.style.borderBottom = '3px solid #0a1e38';
      tab.classList.add('active');
      showContent(tab.dataset.tab + '-content');
    });
  });

  // Auto activate the first tab
  if (businessTabs.length > 0) {
    businessTabs[0].click();
  }

  // 🔧 Mobile Responsive Adjustments
  if (window.innerWidth <= 767) {
    // Make inner tabs scrollable
    const tabBar = document.getElementById("business-tabs");
    if (tabBar) {
      tabBar.style.overflowX = "auto";
      tabBar.style.flexWrap = "nowrap";
      tabBar.style.gap = "20px";
      tabBar.style.padding = "12px 10px";
      tabBar.style.fontSize = "13px";
    }

    document.querySelectorAll("#business-tabs div").forEach(tab => {
      tab.style.minWidth = "max-content";
      tab.style.whiteSpace = "nowrap";
      tab.style.fontSize = "14px";
      tab.style.padding = "12px 10px";
    });

    // Resize headings and text
    const h1 = document.querySelector("h1");
    if (h1) {
      h1.style.fontSize = "18px";
      h1.style.lineHeight = "1.4";
      h1.style.padding = "0 10px";
    }

    document.querySelectorAll("p").forEach(p => {
      p.style.fontSize = "13px";
      p.style.padding = "0 10px";
    });

    // Adjust CTA button
    const links = document.querySelectorAll("a");
    links.forEach(link => {
      if (link.textContent.includes("Try") || link.textContent.includes("শুরু করুন")) {
        link.style.fontSize = "14px";
        link.style.padding = "10px 20px";
      }
    });

    // Adjust content layout
    document.querySelectorAll(".tab-content > div").forEach(container => {
      container.style.flexDirection = "column";
      container.style.gap = "20px";
    });

    document.querySelectorAll(".tab-content h3").forEach(h3 => {
      h3.style.fontSize = "16px";
    });

    document.querySelectorAll(".tab-content ul li").forEach(li => {
      li.style.fontSize = "13px";
      li.style.paddingLeft = "22px";
      li.style.marginBottom = "10px";
    });

    document.querySelectorAll(".tab-content img").forEach(img => {
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.marginTop = "10px";
    });

    // Make sure that images are responsive inside swiper
    const swiperImages = document.querySelectorAll('.swiper-slide img');
    swiperImages.forEach(img => {
      img.style.width = "100%";
      img.style.height = "auto";
    });
  }
});
</script>


<!-------------------------------------------------------->

<section id="sohub-connect-section">
  <div style="max-width:920px;margin:40px auto;font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;color:#222;background:#fff; text-align:center; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">

	<!-- Bold Professional Subheading -->
	<h1 style="font-weight:700; font-size:18px; margin-bottom:20px; text-align:center; color:#444;">
	  <?php echo ($site_lang == 'english') 
		? 'Real-Time Monitoring, Analytics, and Actionable Control' 
		: 'হাতের মুঠোয় কন্ট্রোল, অ্যানালিটিক্স এবং রিয়েল-টাইম মনিটরিং'; ?>
	</h1>



    <!-- Tabs -->
    <div id="sohub-connect-tabs"
         style="background:#f9fafc;border-radius:12px 12px 0 0;padding:0 20px;border:1px solid #d7dce6;border-bottom:none;display:flex;gap:15px;font-size:13px;color:#8a8a8a;font-weight:600;user-select:none;overflow-x:auto;white-space:nowrap;"
         data-aos="fade-in" data-aos-duration="600">
      <div data-tab="dashboard" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;display:inline-block;" data-aos="fade-in" data-aos-delay="50">
        <?php echo ($site_lang == 'english') ? 'Dashboard' : 'ড্যাশবোর্ড'; ?>
      </div>
      <div data-tab="operator-panel" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;display:inline-block;" data-aos="fade-in" data-aos-delay="100">
        <?php echo ($site_lang == 'english') ? 'Operator Panel' : 'অপারেটর প্যানেল'; ?>
      </div>
      <div data-tab="call-report" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;display:inline-block;" data-aos="fade-in" data-aos-delay="150">
        <?php echo ($site_lang == 'english') ? 'Call Report' : 'কল রিপোর্ট'; ?>
      </div>
      <div data-tab="transaction" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;display:inline-block;" data-aos="fade-in" data-aos-delay="200">
        <?php echo ($site_lang == 'english') ? 'Transaction' : 'ট্রানজেকশন'; ?>
      </div>
		<div data-tab="quick-call" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;display:inline-block;" data-aos="fade-in" data-aos-delay="250">
		  <?php echo ($site_lang == 'english') ? 'Quick Communication' : 'দ্রুত যোগাযোগের সুবিধা'; ?>
		</div>

		<div data-tab="ticketing" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;display:inline-block;" data-aos="fade-in" data-aos-delay="300">
		  <?php echo ($site_lang == 'english') ? 'Problem Ticketing' : 'প্রবলেম টিকিটিং'; ?>
		</div>

			<div data-tab="download" style="padding:14px 0;cursor:pointer;border-bottom:3px solid transparent;display:inline-block;" data-aos="fade-in" data-aos-delay="350">
		  <?php echo ($site_lang == 'english') ? 'Download Phone Software' : 'ফোন সফটওয়্যার ডাউনলোড'; ?>
		</div>

    </div>

 <!-- Dashboard Content Section -->
<div id="dashboard-content" class="sohub-connect-tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;">
  <div class="dashboard-flex" style="display:flex; gap:40px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="dashboard-text" style="flex:1; min-width:280px;">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		  <?php echo ($site_lang == 'english') 
			? 'Monitor and manage your business calls in real time from a clean, minimal dashboard.' 
			: 'গোছানো ও সহজ একটি ড্যাশবোর্ড থেকে রিয়েল-টাইমে আপনার ব্যবসায়িক কলগুলো দেখুন ও নিয়ন্ত্রণ করুন'; ?>
		</h3>
		
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Clean & Minimal Interface – So intuitive, you won’t need to read a manual' 
      : 'ব্যবহারে সহজ ইন্টারফেস যা বুঝতে আপনাকে পড়তে হবে না কোন ধরনের বিড়ম্বনায়'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		<?php echo ($site_lang == 'english') 
      ? 'Live Call Monitoring – Monitor active calls in real time' 
      : 'লাইভ কলগুলোকে রিয়েল-টাইম মনিটরিং এর সুবিধা'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="250">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Answered Calls (Today) – Instantly view how many calls were successfully handled today' 
      : 'কোন নির্দিষ্ট দিনে কতটি কল সফলভাবে হ্যান্ডের করা হয়েছে দেখুন সঙ্গে সঙ্গেই'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="300">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Answered Calls (This Month) – Get a quick view of your team’s monthly call handling performance' 
      : 'একমাসে কতটি কল সফলভাবে হ্যান্ডেল করা হয়েছে অর্থাৎ আপনার টিমের পারফরম্যান্স ট্র্যাক করুন একনজরে'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="350">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Call Analytics Graph – View all your call activity with an interactive 15-day summary' 
      : 'ইন্টারেক্টিভ কল অন্যালেটিক্স গ্রাফে দেখুন আপনাদের যাবতীয় কার্যক্রম'; ?>

		</li>
	  </ul>

	  <p style="font-size:14px; color:#333; margin-top:20px;">
		<?php echo ($site_lang == 'english') 
      ? 'Make smarter decisions with real-time insights, right from your SOHUB Connect dashboard.' 
      : 'SOHUB Connect ড্যাশবোর্ড থেকে রিয়েল-টাইম ইনসাইট পেয়ে আরও স্মার্ট সিদ্ধান্ত নিন'; ?>

	  </p>
	</div>


    <!-- Right Side Swiper Slider -->
    <div class="dashboard-slider" style="flex:1; min-width:280px; max-width:500px;">
      <div class="swiper-container dashboard-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/dashboard1.png" alt="Dashboard Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/dashboard2.png" alt="Dashboard Slide 2" style="width:100%; display:block;" />
          </div>
         
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>


 <!-- Operator Panel -->
<div id="operator-panel-content" class="sohub-connect-tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;">
  <div class="operator-panel-flex" style="display:flex; gap:30px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
    <!-- Left Text Block -->
	   <div class="operator-panel-text" style="flex:1; min-width:280px;">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Monitor all extension activities in real time and stay fully in control of your team’s communication status.' 
      : 'রিয়েল টাইমে এক্সটেনশন অ্যাক্টিভিটি পর্যবেক্ষণ করুন এবং আপনার টিমের কমিউনিকেশন স্ট্যাটাস নিয়ন্ত্রণে রাখুন'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Real-Time Extension Monitoring – Instantly view the real-time status of each extension' 
      : 'প্রতিটি এক্সটেনশনের স্ট্যাটাস দেখুন রিয়েল-টাইম'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Live Presence Indicators – See who is online, offline, on a call, or idle right from your dashboard' 
      : 'অফিসে কোন কর্মী অনলাইন, কে অফলাইন অথবা কে আইডল আছে দেখুন আপনার প্যানেলে'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="250">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
			? 'Centralized View – All extension statuses available from a single, intuitive interface' 
			: 'হলিস্টিক ভিউয়ের জন্য সেন্ট্রালাইজড ইন্টারফেসের সুবিধা, যেখানের আপনি পেয়ে যাবেন একনজরে সবকিছু নিরীক্ষণ এবং পরিবর্তনের সক্ষমতা'; ?>
		</li>
	  </ul>

	  <p style="font-size:14px; color:#333; margin-top:20px;">
		<?php echo ($site_lang == 'english') 
      ? 'Empower supervisors and admins with live visibility to enhance team performance and response time.' 
      : 'লাইভ ভিজিবিলিটি দিয়ে সুপারভাইজার ও অ্যাডমিনদের শক্তিশালী করুন—দলের পারফরম্যান্স ও রেসপন্স টাইম বাড়াতে সহায়তা করুন'; ?>

	  </p>
	</div>


    <!-- Right Side Swiper Slider -->
    <div class="operator-panel-slider" style="flex:1; min-width:280px; max-width:500px;">
      <div class="swiper-container operator-panel-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/operator_panel1.png" alt="Operator Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/operator_panel2.png" alt="Operator Slide 2" style="width:100%; display:block;" />
          </div>
		  <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/operator_panel3.png" alt="Operator Slide 2" style="width:100%; display:block;" />
          </div>
          
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>
<!-- Call Report -->
<div id="call-report-content" class="sohub-connect-tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;">
  <div class="call-report-flex" style="display:flex; gap:30px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
    <!-- Left Text Block -->
	   <div class="call-report-text" style="flex:1; min-width:280px;">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Access detailed call history and analytics to track, audit, and optimize your communication performance.' 
      : 'আপনার কমিউনিকেশন পারফরম্যান্স ট্র্যাক, অডিট এবং অপটিমাইজ করতে বিস্তারিত কল হিস্ট্রি ও অ্যানালিটিক্সের সুবিধা'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Complete CDR (Call Detail Record) – Access full details of all inbound and outbound calls' 
      : 'ইনবাউন্ড ও আউটবাউন্ড কলের সম্পূর্ণ কল ডিটেলস রেকর্ড (CDR) দেখার সুবিধা'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
			? 'Comprehensive Details – Includes call duration, time, caller/callee, status, and more' 
			: 'কে কল করেছে, কখন করেছে, কতটুকু সময়ের জন্য কথা হয়েছে এ সবকিছুর ইনডেপথ কল হিস্ট্রি'; ?>
		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="250">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Search & Filter Options – Quickly find specific calls by date, number, or status' 
      : 'সার্চ ও ফিল্টার অপশন ব্যবহার করে নির্দিষ্ট তারিখ, নম্বর বা স্ট্যাটাস দেখুন সহজেই'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="300">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Export Reports – Download call logs for audits, analysis, or documentation purposes' 
      : 'গবেষণা, অডিট অথবা যেকোনো প্রযোজনে কল-লগ ডাউনলোডের ব্যবস্থা'; ?>

		</li>
	  </ul>

	  <p style="font-size:14px; color:#333; margin-top:20px;">
		<?php echo ($site_lang == 'english') 
      ? 'Stay updated and make data-driven decisions from every call on your system.' 
      : 'আপনার সিস্টেমের প্রতিটি কল থেকে তথ্যভিত্তিক সিদ্ধান্ত নিন ও আপডেট থাকুন'; ?>

	  </p>
	</div>

    <!-- Right Side Swiper Slider -->
    <div class="call-report-slider" style="flex:1; min-width:280px; max-width:500px;">
      <div class="swiper-container call-report-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/report1.png" alt="Call Report Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/report2.png" alt="Call Report Slide 2" style="width:100%; display:block;" />
          </div>
         
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>
<!-- Transaction Section -->
<div id="transaction-content" class="sohub-connect-tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;">
  <div class="transaction-flex" style="display:flex; gap:30px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
    <!-- Left Text Block -->
	 <div class="transaction-text" style="flex:1; min-width:280px;">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Track all your business transactions directly within your SOHUB Connect account—with full transparency.' 
      : 'আপনার ব্যবসার সব লেনদেন ট্র্যাক করুন SOHUB Connect অ্যাকাউন্টেই'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Wallet Reload Details – Check your wallet balance and track all top-ups, including bKash and other payment methods' 
      : 'আপনার ওয়ালেটের বর্তমান অবস্থা দেখে রিচার্জ করুন বিকাশে। এছাড়াও যেকোনো মাধ্যমে করা সকল পেমেন্টের হিসাব রাখুন আপনার অ্যাকাউন্টেই'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		<?php echo ($site_lang == 'english') 
      ? 'Cost Deductions – Know the exact charges in advance for using features like extensions or other services' 
      : 'আমরা আমাদের সার্ভিসের দাম যেমন এক্সটেনশন বা অন্যকোন ফিচার ব্যবহারে আপনার কত টাকা খরচ হবে সেটি আগেই জানিয়ে দেয়'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="250">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Complete Charge History – View a detailed list of all your usage charges in one place' 
      : 'আপনার ব্যবহৃত সকল টাকার চার্জ হিস্ট্রি দেখুন এক তালিকাতেই'; ?>

		</li>
	  </ul>

	  <p style="font-size:14px; color:#333; margin-top:20px;">
		<?php echo ($site_lang == 'english') 
      ? 'Stay financially updated with a clear record of every transaction on your account.' 
      : 'আপনার অ্যাকাউন্টের প্রতিটি লেনদেনের স্পষ্ট রেকর্ডের মাধ্যমে আর্থিকভাবে আপডেট থাকুন'; ?>

	  </p>
	</div>


    <!-- Right Side Swiper Slider -->
    <div class="transaction-slider" style="flex:1; min-width:280px; max-width:500px;">
      <div class="swiper-container transaction-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/transection1.png" alt="Transaction Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/transection2.png" alt="Transaction Slide 2" style="width:100%; display:block;" />
          </div>
       
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>


<!-- Quick Call Section -->
<div id="quick-call-content" class="sohub-connect-tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;">
  <div class="quick-call-flex" style="display:flex; gap:30px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
	<div class="quick-call-text" style="flex:1; min-width:280px;">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Instant Calling Without Configuration – Just select and dial' 
      : 'কোনো কনফিগারেশন ছাড়াই শুধুমাত্র সিলেক্ট ও ডায়াল করুন ইনস্ট্যান্ট'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'No Setup Needed – Use it directly from the admin panel' 
      : 'কোনো সেটআপের দরকার পড়েনা, সরাসরি এডমিন প্যানেল থেকেই ব্যবহারের সুবিধা'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		<?php echo ($site_lang == 'english') 
      ? 'Contact Any Extension – Easily route calls to specific staff or groups as needed' 
      : 'ঝামেলা ছাড়াই চাহিদামতো এক্সটেনশন কলগুলোকে স্টাফিং বা গ্রুপিং করার ব্যবস্থা'; ?>

		</li>
	  </ul>

	  <p style="font-size:14px; color:#333; margin-top:20px;">
		<?php echo ($site_lang == 'english') 
      ? 'Use Quick Call to save time, make instant calls, and boost internal communication.' 
      : 'টাইম বাঁচাতে, ইনস্ট্যান্ট কল করতে ও ইন্টারনাল কমিউনিকেশন বাড়াতে কুইক কল ব্যবহার করুন'; ?>

	  </p>
	</div>


    <!-- Right Side Swiper Slider -->
    <div class="quick-call-slider" style="flex:1; min-width:280px; max-width:500px;">
      <div class="swiper-container quick-call-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/quick_call1.png" alt="Quick Call Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/quick_call2.png" alt="Quick Call Slide 2" style="width:100%; display:block;" />
          </div>
          
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>

<!-- Ticketing -->
<div id="ticketing-content" class="sohub-connect-tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;">
  <div class="ticketing-flex" style="display:flex; gap:30px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
   <!-- Left Text Block -->
	<div class="ticketing-text" style="flex:1; min-width:280px;">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'Raise a Ticket and Get Fast Support from the SOHUB Team' 
      : 'কোনো ধরনের ঝামেলাই পড়লে SOHUB টিমের দ্রুত সহযোগিতা নিন প্রবলেম টিকিটিং ব্যবহার করে'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
	<?php echo ($site_lang == 'english') 
      ? 'Submit technical or billing issues directly through SOHUB’s ticketing system' 
      : 'টেকনিক্যাল বা বিলিং সমস্যার সমাধান করতে ব্যবহার করুন সোহাব টিকিটিং'; ?>

		</li>
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="200">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		 <?php echo ($site_lang == 'english') 
      ? 'Track ticket status and progress all in one place' 
      : 'এক জায়গাতেই টিকিট স্ট্যাটাস এবং প্রগ্রেস দেখার সুবিধা'; ?>

		</li>
	  </ul>

	  <p style="font-size:14px; color:#333; margin-top:20px;">
		<?php echo ($site_lang == 'english') 
      ? 'Ticketing ensures professional, documented, and well-organized support for all your business needs.' 
      : 'টিকিটিং আপনার সব বিজনেস সাপোর্ট চাহিদা পূরণের জন্য প্রফেশনাল, ডকুমেন্টেড ও গুছানো সমাধান নিশ্চিত করে'; ?>

	  </p>
	</div>


    <!-- Right Side Swiper Slider -->
    <div class="ticketing-slider" style="flex:1; min-width:280px; max-width:500px;">
      <div class="swiper-container ticketing-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/ticket1.png" alt="Ticketing Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/ticket2.png" alt="Ticketing Slide 2" style="width:100%; display:block;" />
          </div>
        
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>

<!-- Download Soft Phone -->
<div id="download-content" class="sohub-connect-tab-content" style="border:1px solid #d7dce6; border-radius:0 0 12px 12px; padding:30px 30px 45px; background:#fff; display:none; text-align:left;">
  <div class="download-softphone-flex" style="display:flex; gap:30px; align-items:center; margin-bottom:32px; flex-wrap:wrap;">
    
    <!-- Left Text Block -->
   <div class="download-softphone-text" style="flex:1; min-width:280px;">
	  <h3 style="font-weight:600; font-size:18px; margin-bottom:18px; color:#111;">
		<?php echo ($site_lang == 'english') 
      ? 'No hardware needed — download our official soft phone on your laptop or desktop and start calling seamlessly.' 
      : 'ফোন করতে লাগবে না কোন হার্ডওয়্যার, নিজের ল্যাপটপ অথবা ডেস্কটপে ডাউনলোড করুন আমাদের অফিসিয়াল সফট ফোন আর কল করুন নির্বিঘ্নে, নিরবিচ্ছিন্নভাবে'; ?>

	  </h3>
	  <ul style="list-style:none; padding-left:0; color:#2f9e44; font-size:14px; line-height:1.5; margin:0;">
		<li style="position:relative; margin-bottom:15px; padding-left:35px; padding-right:10px; padding-top:5px; padding-bottom:5px; text-align:left;" data-aos="fade-up" data-aos-delay="150">
		  <span style="position:absolute; left:0; color:#2f9e44; font-weight:bold;">✔</span>
		  <?php echo ($site_lang == 'english') 
      ? 'Download the soft phone easily and install it without hassle. Make professional calls using your laptop or desktop—no hardware phone needed.' 
      : 'সফট ফোনটি সহজেই ডাউনলোড করুন এবং ঝামেলা ছাড়াই ইনস্টল করুন। আপনার ল্যাপটপ বা ডেস্কটপ ব্যবহার করে প্রফেশনাল কল করুন—হার্ডওয়্যার ফোন ছাড়াই'; ?>

		</li>
	  </ul>

	  <a href="https://connect-client.sohub.com.bd/assets/file/softphone/SohubConnect-3.21.5.exe" target="_blank" style="display:inline-block; margin-top:12px; font-weight:600; background:#457ec0; color:#fff; padding:10px 22px; border-radius:30px; text-decoration:none; font-size:13px;"> 
		<?php echo ($site_lang == 'english') ? 'Download Now' : 'এখনই ডাউনলোড করুন'; ?>
	  </a>
	</div>


    <!-- Right Side Swiper Slider -->
    <div class="download-softphone-slider" style="flex:1; min-width:280px; max-width:500px;">
      <div class="swiper-container download-softphone-swiper" style="width:100%; border-radius:16px; overflow:hidden;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/softphone1.png" alt="Soft Phone Slide 1" style="width:100%; display:block;" />
          </div>
          <div class="swiper-slide">
            <img src="<?php echo base_url(); ?>assets/connect/img/soft_phone.png" alt="Soft Phone Slide 2" style="width:100%; display:block;" />
          </div>
         
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</div>


</section>


<script>
  document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector("#sohub-connect-section");
    if (!wrapper) return;

    const tabs = wrapper.querySelectorAll('#sohub-connect-tabs div');
    const contents = wrapper.querySelectorAll('.sohub-connect-tab-content');

    function showTab(id) {
      contents.forEach(c => c.style.display = c.id === id ? 'block' : 'none');
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.color = '#8a8a8a';
        t.style.borderBottom = '3px solid transparent';
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        showTab(tab.dataset.tab + '-content');
        tab.classList.add('active');
        tab.style.color = '#0a1e38';
        tab.style.borderBottom = '3px solid #0a1e38';
      });
    });

    if (tabs.length > 0) {
      tabs[0].click();
    }

    // Inject Responsive CSS Inline
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        #sohub-connect-tabs {
          flex-wrap: nowrap !important; /* Prevent wrapping */
          justify-content: flex-start !important; /* Align to the start */
        }

        #sohub-connect-tabs div {
          padding: 12px 0 !important;
          font-size: 14px !important;
          white-space: nowrap; /* Ensure the tabs stay in one line */
        }
      }
    `;
    document.head.appendChild(style);
  });
</script>




<!-- Features Section -->
<section class="py-24 bg-white mb-16" data-aos="fade-up">
  <div class="max-w-7xl mx-auto px-6 text-center">
    <h2 class="text-4xl font-extrabold mb-12 text-gray-800">
      <?php echo ($site_lang == 'english') ? 'Key Features of SOHUB Connect' : 'SOHUB Connect এর মূল বৈশিষ্ট্যসমূহ'; ?>
    </h2>
    <div class="bg-gray-50 p-12 rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 text-left">
        <?php
          $features = [
			["📞", 
				($site_lang == 'english') ? "Easy Phone System" : "সহজ ফোন সিস্টেম", 
				($site_lang == 'english') ? "Use a simple phone system that works without any complicated hardware. Manage it online anytime, anywhere." : "জটিল যন্ত্রপাতি ছাড়া একটি সহজ ফোন সিস্টেম ব্যবহার করুন। যেকোনো সময়, যেকোনো জায়গা থেকে অনলাইনে নিয়ন্ত্রণ করুন"
			],
			["🌐", 
				($site_lang == 'english') ? "Number Selection from IPTSP Operators" : "IPTSP অপারেটরদের থেকে নম্বর নির্বাচন", 
				($site_lang == 'english') ? "Select and activate your number from a list of reliable operators, all while managing it through a simple billing process." : "বিশ্বাসযোগ্য অপারেটরদের তালিকা থেকে নম্বর নির্বাচন এবং সক্রিয় করুন, সহজ বিলিং প্রক্রিয়া ব্যবহার করে এটি পরিচালনা করুন"
			],
			["🗣️", 
				($site_lang == 'english') ? "Interactive Voice Response (IVR)" : "ইন্টারঅ্যাকটিভ ভয়েস রেসপন্স (IVR)", 
				($site_lang == 'english') ? "Create professional and personalized automated responses for effective call routing, ensuring a smooth customer experience." : "কার্যকরী কল রাউটিংয়ের জন্য পেশাদার এবং ব্যক্তিগতকৃত স্বয়ংক্রিয় প্রতিক্রিয়া তৈরি করুন, নিশ্চিত করুন একটি মসৃণ গ্রাহক অভিজ্ঞতা"
			],
			["🔁", 
				($site_lang == 'english') ? "Ring Groups" : "রিং গ্রুপ", 
				($site_lang == 'english') ? "Efficiently distribute incoming calls to the right team or department, ensuring that no call is missed." : "এincoming কলগুলি সঠিক টিম বা বিভাগের কাছে দক্ষতার সাথে বিতরণ করুন, নিশ্চিত করুন যে কোনো কল মিস না হয়"
			],
			["📼", 
				($site_lang == 'english') ? "Call Recording" : "কল রেকর্ডিং", 
				($site_lang == 'english') ? "Capture and securely store all your calls for training, compliance, and quality assurance purposes." : "প্রশিক্ষণ, সম্মতি এবং গুণমান নিশ্চিত করার জন্য আপনার সকল কল রেকর্ড করুন এবং নিরাপদে সংরক্ষণ করুন (শীঘ্রই আসছে)"
			],
			["🔀", 
				($site_lang == 'english') ? "Custom Call Routing" : "কাস্টম কল রাউটিং", 
				($site_lang == 'english') ? "Take full control of incoming and outgoing call flows, directing them with precision to the right team, department, or individual." : "আসা ও যাওয়া কল প্রবাহগুলি পুরোপুরি নিয়ন্ত্রণ করুন, সঠিকভাবে সেগুলিকে সঠিক টিম, বিভাগ বা ব্যক্তির কাছে পরিচালনা করুন"
			],
			["🧩", 
				($site_lang == 'english') ? "Extensions Management" : "এক্সটেনশন ব্যবস্থাপনা", 
				($site_lang == 'english') ? "Add, modify, or remove extensions as your team grows, all from a user-friendly interface." : "আপনার টিম বাড়ার সাথে সাথে এক্সটেনশন যোগ, সংশোধন বা মুছুন, সবই একটি ব্যবহারকারী-বান্ধব ইন্টারফেস থেকে"
			],
			["📊", 
				($site_lang == 'english') ? "Flexible Subscription Plans" : "লচিল সাবস্ক্রিপশন পরিকল্পনা", 
				($site_lang == 'english') ? "Only pay for the features you actually need, and scale your system as your business expands." : "আপনার প্রয়োজনীয় ফিচারগুলির জন্যই পেমেন্ট করুন, এবং আপনার ব্যবসা সম্প্রসারণের সাথে সাথে আপনার সিস্টেম স্কেল করুন"
			],
			["🔄", 
				($site_lang == 'english') ? "Multi-Operator Flexibility" : "মাল্টি-অপারেটর ফ্লেক্সিবিলিটি", 
				($site_lang == 'english') ? "Switch between operators with ease, choosing the best option based on pricing or quality for your business needs." : "অপারেটরগুলির মধ্যে সহজেই পরিবর্তন করুন, আপনার ব্যবসায়িক প্রয়োজন অনুযায়ী মূল্য বা গুণমানের ভিত্তিতে সেরা অপশনটি বেছে নিন"
			],
			["⚙️", 
				($site_lang == 'english') ? "Simple Setup & Management" : "সহজ সেটআপ এবং পরিচালনা", 
				($site_lang == 'english') ? "Set up and manage your system online with no technical skills required—perfect for non-technical users." : "প্রযুক্তিগত দক্ষতা ছাড়াই অনলাইনে আপনার সিস্টেম সেটআপ এবং পরিচালনা করুন—অপ্রযুক্তিগত ব্যবহারকারীদের জন্য আদর্শ"
			],
			["🤝", 
				($site_lang == 'english') ? "Enhanced Team Collaboration" : "বর্ধিত টিম সহযোগিতা", 
				($site_lang == 'english') ? "Facilitate smooth communication and call routing within teams to enhance internal collaboration." : "অভ্যন্তরীণ সহযোগিতা বাড়াতে টিমগুলির মধ্যে মসৃণ যোগাযোগ এবং কল রাউটিং সহজ করুন"
			],
			["🔐", 
				($site_lang == 'english') ? "Data Security & Reliability" : "ডেটা নিরাপত্তা ও নির্ভরযোগ্যতা", 
				($site_lang == 'english') ? "Ensure your data is secure and your communication system is always up and running with our reliable infrastructure." : "নির্ভরযোগ্য অবকাঠামোর মাধ্যমে নিশ্চিত করুন যে আপনার ডেটা সুরক্ষিত এবং আপনার যোগাযোগ ব্যবস্থা সবসময় সচল থাকবে"
			]
		];

          foreach ($features as $i => $f) {
            echo '<div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="'.($i * 75).'">';
            echo '<div class="text-3xl" style="color:#457ec0">'.$f[0].'</div>';
            echo '<div><h3 class="font-semibold text-lg mb-1 text-gray-800">'.$f[1].'</h3><p class="text-gray-600 text-sm">'.$f[2].'</p></div>';
            echo '</div>';
          }
        ?>
      </div>
    </div>
  </div>
</section>


<!-- How It Works -->
<section class="py-24 bg-white mb-16" data-aos="fade-up">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-4xl font-extrabold mb-10 text-gray-800">
      <?php echo ($site_lang == 'english') ? 'How It Works – In 3 Simple Steps' : 'কীভাবে এটি কাজ করে – ৩টি সহজ পদক্ষেপে'; ?>
    </h2>
    <div class="grid md:grid-cols-3 gap-12 text-left">
      <div data-aos="fade-up">
        <h3 class="text-lg font-semibold mb-2"><?php echo ($site_lang == 'english') ? '1. Choose Your Business Number' : '১. আপনার ব্যবসার নম্বর বেছে নিন'; ?></h3>
        <p class="text-gray-600"><?php echo ($site_lang == 'english') ? 'Select a business number from a range of trusted IPTSP providers, and get started immediately.' : 'বিশ্বাসযোগ্য IPTSP প্রোভাইডারদের মধ্যে থেকে একটি ব্যবসার নম্বর বেছে নিন, এবং তাৎক্ষণিকভাবে শুরু করুন'; ?></p>
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <h3 class="text-lg font-semibold mb-2"><?php echo ($site_lang == 'english') ? '2. Complete KYC with Your Operator' : '২. অপারেটরের সাথে KYC সম্পূর্ণ করুন'; ?></h3>
        <p class="text-gray-600"><?php echo ($site_lang == 'english') ? 'Complete a quick and simple KYC verification process with your chosen operator to get verified.' : 'নির্বাচিত অপারেটরের সাথে একটি দ্রুত এবং সহজ KYC যাচাইকরণ প্রক্রিয়া সম্পূর্ণ করুন'; ?></p>
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-lg font-semibold mb-2"><?php echo ($site_lang == 'english') ? '3. Start Managing and Making Calls' : '৩. কল এবং ব্যবস্থাপনা শুরু করুন'; ?></h3>
        <p class="text-gray-600"><?php echo ($site_lang == 'english') ? 'Once verified, you can easily manage your call flows and start making professional calls with SOHUB Connect.' : 'যাচাইকৃত হলে, আপনি সহজেই আপনার কল প্রবাহ পরিচালনা করতে পারবেন এবং SOHUB Connect এর মাধ্যমে পেশাদার কল শুরু করতে পারবেন'; ?></p>
      </div>
    </div>
  </div>
</section>


<!-- CTA -->
<section class="text-center py-20 mb-8" style="background: linear-gradient(135deg, #dbeafe, #e9d5ff);" data-aos="zoom-in">
 <a href="<?php echo base_url(); ?>pricing"
   class="text-white text-base font-bold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
   style="text-decoration: none; background-color: #457ec0;"
   onmouseover="this.style.backgroundColor='#2563eb';"
   onmouseout="this.style.backgroundColor='#457ec0';" target="">
  <?= ($site_lang == 'english') ? 'Start Free Now' : 'এখনই ফ্রি শুরু করুন'; ?>
</a>

</section>






<!-- Responsive Styling -->
<style>
  @media (max-width: 768px) {
    .cug-flex-container {
      flex-direction: column !important;
      gap: 24px !important;
    }

    .cug-text {
      text-align: left;
    }

    .cug-text h3 {
      font-size: 16px;
    }

    .cug-text ul {
      font-size: 13px;
    }

    .swiper-container {
      margin-top: 10px;
      max-width: 100%;
    }

    .cug-slider {
      max-width: 100% !important;
    }
  }
  
</style>




<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


<script>
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }
    
  });
</script>

<!-- Responsive Styling -->
<style>
  @media (max-width: 768px) {
    /* Ensure no interference with header */
    .swiper-container {
      margin-top: 10px;
      width: 100%;  /* Ensure the container takes full width on mobile */
      height: auto; /* Maintain aspect ratio */
      max-width: 100%; /* Prevents conflicts with the header */
    }

    /* Swiper Slide images should adapt to mobile width */
    .swiper-slide img {
      width: 100% !important; /* Ensure images fit inside the slides */
      height: auto; /* Maintain aspect ratio */
    }



    /* Layout fixes for the text content */
    .cug-flex-container, .call-efficiency-flex, .ring-group-flex {
      flex-direction: column !important;
      gap: 24px !important;
    }

    .cug-text h3, .call-efficiency-text h3, .ring-group-text h3 {
      font-size: 16px !important;
    }

    .cug-text ul, .call-efficiency-text ul, .ring-group-text ul {
      font-size: 13px !important;
    }

    /* Ensure the slider adjusts properly on mobile */
    .cug-slider, .call-efficiency-slider, .ring-group-slider {
      width: 100% !important; /* Full width for mobile */
      max-width: 100% !important; /* Prevent the slider from exceeding mobile width */
    }

    /* Optional: You can also adjust the font size for smaller screens */
    h1, h2, h3 {
      font-size: 16px !important;
    }

    p {
      font-size: 13px !important;
    }
  }
</style>



<!-- Replace AOS CSS with GSAP libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Convert all AOS animations to GSAP
  document.querySelectorAll('[data-aos]').forEach(element => {
    const type = element.getAttribute('data-aos');
    const delay = element.getAttribute('data-aos-delay') ? parseInt(element.getAttribute('data-aos-delay'))/1000 : 0;
    const duration = element.getAttribute('data-aos-duration') ? parseInt(element.getAttribute('data-aos-duration'))/1000 : 0.8;
    
    let fromVars = { opacity: 0, duration: duration, delay: delay, ease: "power2.out" };
    
    // Set animation type based on AOS attribute
    if (type === 'fade-up') {
      fromVars.y = 30;
    } else if (type === 'fade-right') {
      fromVars.x = -30;
    } else if (type === 'fade-left') {
      fromVars.x = 30;
    } else if (type === 'zoom-in') {
      fromVars.scale = 0.9;
    }
    
    // Create ScrollTrigger animation
    gsap.from(element, {
      ...fromVars,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    
    // Remove AOS attributes to prevent conflicts
    element.removeAttribute('data-aos');
    element.removeAttribute('data-aos-delay');
    element.removeAttribute('data-aos-duration');
  });
  
  // Hero section animation
  gsap.timeline()
    .from(".hero-heading", {opacity: 0, y: -20, duration: 0.8, ease: "power2.out"})
    .from(".hero-subline", {opacity: 0, y: -15, duration: 0.8, ease: "power2.out"}, "-=0.6")
    .from(".start-btn", {opacity: 0, y: 20, duration: 0.8, ease: "power2.out"}, "-=0.6");
  
  // Business tabs
  const businessTabs = document.querySelectorAll('#business-tabs div');
  const tabContents = document.querySelectorAll('.tab-content');
  
  function showContent(id) {
    tabContents.forEach(content => content.style.display = 'none');
    const activeContent = document.getElementById(id);
    if (activeContent) {
      activeContent.style.display = 'block';
      gsap.fromTo(activeContent, 
        {opacity: 0, y: 15}, 
        {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"}
      );
      
      // Animate content elements
      gsap.fromTo(activeContent.querySelectorAll('h3, p, ul, .swiper-container'),
        {opacity: 0, y: 20},
        {opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out"}
      );
    }
  }
  
  businessTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      
      businessTabs.forEach(t => {
        t.style.color = '#8a8a8a';
        t.style.borderBottom = '3px solid transparent';
        t.classList.remove('active');
      });
      
      tab.style.color = '#0a1e38';
      tab.style.borderBottom = '3px solid #0a1e38';
      tab.classList.add('active');
      showContent(tab.dataset.tab + '-content');
      
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });
  });
  
  // SOHUB Connect tabs
  const sohubTabs = document.querySelectorAll('#sohub-connect-tabs div');
  const sohubContents = document.querySelectorAll('.sohub-connect-tab-content');
  
  function showSohubTab(id) {
    sohubContents.forEach(content => content.style.display = 'none');
    const activeContent = document.getElementById(id);
    if (activeContent) {
      activeContent.style.display = 'block';
      gsap.fromTo(activeContent, 
        {opacity: 0, y: 15}, 
        {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"}
      );
      
      // Animate content elements
      gsap.fromTo(activeContent.querySelectorAll('h3, p, ul, .swiper-container'),
        {opacity: 0, y: 20},
        {opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out"}
      );
    }
    
    sohubTabs.forEach(t => {
      t.classList.remove('active');
      t.style.color = '#8a8a8a';
      t.style.borderBottom = '3px solid transparent';
    });
  }
  
  sohubTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showSohubTab(tab.dataset.tab + '-content');
      tab.classList.add('active');
      tab.style.color = '#0a1e38';
      tab.style.borderBottom = '3px solid #0a1e38';
      
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });
  });
  
  // Initialize tabs
  setTimeout(() => {
    if (businessTabs.length > 0) businessTabs[0].click();
    if (sohubTabs.length > 0) sohubTabs[0].click();
  }, 100);
  
  // Initialize Swiper
  if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.swiper-container').forEach(container => {
      new Swiper(container, {
        loop: true,
        autoplay: {delay: 3000, disableOnInteraction: false},
        pagination: {el: container.querySelector('.swiper-pagination'), clickable: true}
      });
    });
  }
});
</script>

