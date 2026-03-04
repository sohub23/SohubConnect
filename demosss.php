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

	  <a href="https://connect.sohub.com.bd/assets/file/softphone/SohubConnect-3.21.5.exe" target="_blank" style="display:inline-block; margin-top:12px; font-weight:600; background:#457ec0; color:#fff; padding:10px 22px; border-radius:30px; text-decoration:none; font-size:13px;"> 
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

