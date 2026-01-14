import transporter from "../lib/sendMail.js";
import classScheduleModel from "../model/classScheduleModel.js";
import { User } from "../model/userModel.js";


export const sendMessage = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await transporter.sendMail({
      from: `"Apex Athletics Gym Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Get in Touch",
      // html: `
      //   <h2>New Message from Apex Athletics Gym Contact</h2>
      //   <p><b>Name:</b> ${name}</p>
      //   <p><b>Email:</b> ${email}</p>
      //   <p><b>Message:</b> ${msg}</p>
      // `,
      html: `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Admin Contact Alert</title>
</head>

<body style="margin:0; padding:0; background:#eef2f7; font-family:Arial, Helvetica, sans-serif;">

<table  style="padding:18px;" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;
        border-radius:12px;
        box-shadow:0 10px 25px rgba(0,0,0,0.12);
        overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="
            background:linear-gradient(135deg,#000000,#1f2937);
            padding:18px;
            text-align:center;
          ">
            <h2 style="margin:0; color:#ffffff; font-size:22px;">
              Apex Athletics Gym
            </h2>
            <p style="margin:4px 0 0; color:#9ca3af; font-size:12px;">
              Admin Contact Notification
            </p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:18px; color:#111827; font-size:14px;">

            <p style="margin:0 0 12px 0;">
              New message received from website contact form.
              <strong style="color:#dc2626;">Admin access only.</strong>
            </p>

            <p style="margin:4px 0;"><strong>Name:</strong>
              <span style="color:#2563eb;">${name}</span>
            </p>

            <p style="margin:4px 0;"><strong>Email:</strong>
              <span style="color:#16a34a;">${email}</span>
            </p>

            <p style="margin:12px 0 6px 0; font-weight:bold; color:#000;">
              Message:
            </p>

            <div style="
              background:#f8fafc;
              border-left:4px solid #dc2626;
              padding:12px;
              border-radius:6px;
              color:#1f2937;
              line-height:1.5;
            ">
              ${msg}
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#020617; padding:10px; text-align:center;">
            <p style="margin:0; font-size:11px; color:#9ca3af;">
              © ${new Date().getFullYear()} Apex Athletics Gym · Admin system email
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};


export const sendMessageFromContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, msg } = req.body;

    // ✅ phoneNo is optional
    if (!firstName || !lastName || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 🚀 Respond immediately (FAST)
    res.status(200).json({
      success: true,
      message: "Message received",
    });

    // 🔥 Send email in background
    setImmediate(async () => {
      try {
        await transporter.sendMail({
          from: `"Apex Athletics Gym Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: "📩 New Contact Message",
          html: `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Admin Contact Alert</title>
</head>

<body style="margin:0; padding:0; background:#eef2f7; font-family:Arial, Helvetica, sans-serif;">

<table  style="padding:18px;" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;
        border-radius:12px;
        box-shadow:0 10px 25px rgba(0,0,0,0.12);
        overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="
            background:linear-gradient(135deg,#000000,#1f2937);
            padding:18px;
            text-align:center;
          ">
            <h2 style="margin:0; color:#ffffff; font-size:22px;">
              Apex Athletics Gym
            </h2>
            <p style="margin:4px 0 0; color:#9ca3af; font-size:12px;">
              Admin Contact Notification
            </p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:18px; color:#111827; font-size:14px;">

            <p style="margin:0 0 12px 0;">
              New message received from website contact form.
              <strong style="color:#dc2626;">Admin access only.</strong>
            </p>

            <p style="margin:4px 0;"><strong>Name:</strong>
              <span style="color:#2563eb;">${firstName + " " + lastName}</span>
            </p>

            <p style="margin:4px 0;"><strong>Email:</strong>
              <span style="color:#16a34a;">${email}</span>
            </p>

            <p style="margin:4px 0;"><strong>Phone Number:</strong>
              <span style="color:#16a34a;">${phoneNo ? phoneNo : ""}</span>
            </p>}

            <p style="margin:12px 0 6px 0; font-weight:bold; color:#000;">
              Message:
            </p>

            <div style="
              background:#f8fafc;
              border-left:4px solid #dc2626;
              padding:12px;
              border-radius:6px;
              color:#1f2937;
              line-height:1.5;
            ">
              ${msg}
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#020617; padding:10px; text-align:center;">
            <p style="margin:0; font-size:11px; color:#9ca3af;">
              © ${new Date().getFullYear()} Apex Athletics Gym · Admin system email
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`        });

        console.log("✅ Contact mail sent successfully");
      } catch (err) {
        // ❌ NEVER use res here
        console.error("❌ Contact mail error:", err.message);
      }
    });

  } catch (error) {
    console.error("❌ Controller error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Function to generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // random 6 digits
};

export const sendVerificationEmail = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const otp = generateOTP();

    // Send email
    await transporter.sendMail({
      from: `"Apex Athletics Gym" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔒 Your Verification Code",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verification Code</title>
</head>
<body style="margin:0; padding:0; background:#eef2f7; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 12px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.12);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#000000,#1f2937); padding:20px; text-align:center;">
              <h2 style="margin:0; color:#ffffff; font-size:22px;">Apex Athletics Gym</h2>
              <p style="margin:4px 0 0; color:#9ca3af; font-size:12px;">Authentication Verification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:20px; color:#111827; font-size:14px;">
              <p>Hi <strong style="color:#2563eb;">${name}</strong>,</p>
              <p style="margin:10px 0 16px 0;">Use the following verification code to complete your authentication:</p>

              <div style="background:#f8fafc; border-left:4px solid #dc2626; padding:20px; border-radius:6px; text-align:center; font-size:22px; font-weight:bold; color:#1f2937;">
                ${otp}
              </div>

              <p style="margin-top:16px; font-size:12px; color:#6b7280;">
                This code is valid for 10 minutes. Do not share it with anyone.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#020617; padding:12px; text-align:center;">
              <p style="margin:0; font-size:11px; color:#9ca3af;">
                © ${new Date().getFullYear()} Apex Athletics Gym
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
      otp, // optionally return for testing, in production save in DB or session
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

// classSchedule Mail

export const sendClassScheduleEmail = async (req, res) => {
  try {
    const { scheduleTimeId } = req.params;
    console.log(scheduleTimeId)
    const userId = req.user._id

    // 1️⃣ Get user
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2️⃣ Get schedule
    const scheduleTime = await classScheduleModel.findById(scheduleTimeId);
    if (!scheduleTime) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }
    console.log("scheduleTime", scheduleTime)

    // 3️⃣ Create class date (TOMORROW)
    const classDate = new Date();
    classDate.setDate(classDate.getDate() + 1);

    // 4️⃣ Parse "4 PM"
    const [hour, modifier] = scheduleTime.time.split(" ");
    let h = parseInt(hour, 10);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    // 5️⃣ Start time
    const startTime = new Date(classDate);
    startTime.setHours(h, 0, 0, 0);

    // 6️⃣ End time (+1 hour)
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    // 7️⃣ Format times for email
    const formattedStartTime = startTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedEndTime = endTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // 8️⃣ Send email
    await transporter.sendMail({
      from: `"Apex Athletics Gym" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "🏋️ Class Schedule Confirmed",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Class Schedule Confirmation</title>
</head>
<body style="margin:0; padding:20px; font-family:Arial, Helvetica, sans-serif; background:#eef2f7; color:#111827; line-height:1.6;">
  <div style="max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

    <h2 style="margin:0 0 10px 0; color:#000;">Apex Athletics Gym</h2>
    <p style="margin:0 0 20px 0; color:#555;">Class Schedule Confirmation</p>

    <p>Hi <strong style="color:#2563eb;">${user.name}</strong>,</p>
    <p>Your class has been <strong style="color:#16a34a;">successfully booked</strong>. Here are the details:</p>

    <p><strong>Class:</strong> ${scheduleTime.class.toUpperCase()}</p>
    <p><strong>Training Name:</strong> ${scheduleTime.trainingName.toUpperCase()}</p>
    <p><strong>Date:</strong> ${classDate.toDateString()}</p>
    <p><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</p>
    <p><strong>Status:</strong> Confirmed ✅</p>

    <p style="margin-top:20px; font-size:13px; color:#6b7280;">
      Please arrive 10 minutes early and carry your workout essentials.
    </p>

    <p style="margin-top:30px; font-size:11px; color:#9ca3af; text-align:center;">
      © ${new Date().getFullYear()} Apex Athletics Gym
    </p>

  </div>
</body>
</html>
  `,
    });

    return res.status(200).json({
      success: true,
      message: "Class schedule email sent successfully",
    });

  } catch (error) {
    console.error("Class schedule email error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send class schedule email",
    });
  }
};

// sendClassCancelledEmail

export const sendClassCancelledEmail = async (req, res) => {
  try {
    const { userId, scheduleTimeId } = req.params;

    // 1️⃣ Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2️⃣ Get schedule
    const scheduleTime = await classScheduleModel.findById(scheduleTimeId);
    if (!scheduleTime) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    // 3️⃣ Create class date (TOMORROW)
    const classDate = new Date();
    classDate.setDate(classDate.getDate() + 1);

    // 4️⃣ Parse "4 PM"
    const [hour, modifier] = scheduleTime.time.split(" ");
    let h = parseInt(hour, 10);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    // 5️⃣ Start time
    const startTime = new Date(classDate);
    startTime.setHours(h, 0, 0, 0);

    // 6️⃣ End time (+1 hour)
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    // 7️⃣ Format times
    const formattedStartTime = startTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedEndTime = endTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // 8️⃣ Send cancellation email
    await transporter.sendMail({
      from: `"Apex Athletics Gym" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "❌ Class Cancelled – Apex Athletics Gym",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Class Cancellation</title>
</head>
<body style="margin:0; padding:20px; font-family:Arial, Helvetica, sans-serif; background:#eef2f7; color:#111827; line-height:1.6;">
  <div style="max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

    <h2 style="margin:0 0 10px 0; color:#000;">Apex Athletics Gym</h2>
    <p style="margin:0 0 20px 0; color:#555;">Class Cancellation Notice</p>

    <p>Hi <strong style="color:#2563eb;">${user.name}</strong>,</p>

    <p>
      We regret to inform you that your scheduled class has been
      <strong style="color:#dc2626;">cancelled by the Management</strong>.
    </p>

    <p><strong>Class:</strong> ${scheduleTime.class.toUpperCase()}</p>
    <p><strong>Training Name:</strong> ${scheduleTime.trainingName.toUpperCase()}</p>
    <p><strong>Date:</strong> ${classDate.toDateString()}</p>
    <p><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</p>
    <p><strong>Status:</strong> Cancelled ❌</p>

    <p style="margin-top:20px; font-size:13px; color:#6b7280;">
      Please visit our app to book another class or contact support if you need assistance.
    </p>

    <div style="margin-top:25px; text-align:center;">
  <a 
    href="https://portfilio2.vercel.app/"
    target="_blank"
    style="
      display:inline-block;
      padding:12px 24px;
      background:#2563eb;
      color:#ffffff;
      border-radius:8px;
      text-decoration:none;
      font-weight:600;
      font-size:14px;
    "
  >
    Visit Website
  </a>
</div>


    <p style="margin-top:30px; font-size:11px; color:#9ca3af; text-align:center;">
      © ${new Date().getFullYear()} Apex Athletics Gym
    </p>

  </div>
</body>
</html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Class cancellation email sent successfully",
    });

  } catch (error) {
    console.error("Class cancellation email error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send class cancellation email",
    });
  }
};

export const sendUserMessage = async (req, res) => {
  try {
    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    // send email
    await transporter.sendMail({
      from: `"Apex Athletics Gym" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "📩 Message from Management",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Message from Management</title>
</head>
<body style="margin:0; padding:0; background:#eef2f7; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 12px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.12);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#000000,#1f2937); padding:20px; text-align:center;">
              <h2 style="margin:0; color:#ffffff; font-size:22px;">Apex Athletics Gym</h2>
              <p style="margin:4px 0 0; color:#9ca3af; font-size:12px;">Message from Management</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:20px; color:#111827; font-size:14px;">
              <p>Hi <strong style="color:#2563eb;">${name}</strong>,</p>
              <p style="margin:10px 0 16px 0;">You have a new message from the management:</p>

              <div style="background:#f8fafc; padding:20px; border-radius:6px; text-align:center; font-size:16px; font-weight:bold; color:#1f2937;">
                ${message}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#020617; padding:12px; text-align:center;">
              <p style="margin:0; font-size:11px; color:#9ca3af;">
                © ${new Date().getFullYear()} Apex Athletics Gym
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}

export const sendMessageAllUsers = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message.message.trim())
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    const emailPromises = users.map(user =>
      transporter.sendMail({
        from: `"Apex Athletics Gym" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "📩 Message from Management",
        html: `
          <html>
            <body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:30px 12px;">
                    <table width="600" style="background:#fff;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,0.12);overflow:hidden;">
                      <tr>
                        <td style="background:linear-gradient(135deg,#000000,#1f2937);padding:20px;text-align:center;">
                          <h2 style="margin:0;color:#fff;font-size:22px;">Apex Athletics Gym</h2>
                          <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">Message from Management</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:20px;color:#111827;font-size:14px;">
                          <p>Hi <strong style="color:#2563eb;">${user.name}</strong>,</p>
                          <p>You have a new message from the management:</p>
                          <div style="background:#f8fafc;padding:20px;border-radius:6px;text-align:center;font-size:16px;font-weight:bold;color:#1f2937;">
                            ${message.message.trim()}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="background:#020617;padding:12px;text-align:center;">
                          <p style="margin:0;font-size:11px;color:#9ca3af;">© ${new Date().getFullYear()} Apex Athletics Gym</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      })
    );

    await Promise.all(emailPromises);

    return res.status(200).json({
      success: true,
      message: "Message sent to all users successfully",
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

export const sendClassScheduleEmailInternal = async (userId, scheduleTimeId) => {
  console.log("email sending");
  console.log("userId", userId);
  console.log("scheduleTimeId", scheduleTimeId);
  try {
    // 1️⃣ Get user
    const user = await User.findById(userId);
    if (!user) {
      console.error("Email error: User not found");
      return;
    }

    transporter.verify((error, success) => {
      if (error) console.error("SMTP ERROR:", error);
      else console.log("SMTP READY");
    });

    // 2️⃣ Get schedule
    const scheduleTime = await classScheduleModel.findById(scheduleTimeId);
    if (!scheduleTime) {
      console.error("Email error: Schedule not found");
      return;
    }

    // 3️⃣ Create class date (TOMORROW)
    const classDate = new Date();
    classDate.setDate(classDate.getDate() + 1);

    // 4️⃣ Parse time (e.g., "4 PM")
    const [hour, modifier] = scheduleTime.time.split(" ");
    let h = parseInt(hour, 10);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    // 5️⃣ Start & End time
    const startTime = new Date(classDate);
    startTime.setHours(h, 0, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    // 6️⃣ Format times
    const formattedStartTime = startTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedEndTime = endTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // 7️⃣ Send email (NON-BLOCKING)
    await transporter.sendMail({
      from: `"Apex Athletics Gym" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "🏋️ Class Schedule Confirmed",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Class Schedule Confirmation</title>
</head>
<body style="margin:0; padding:20px; font-family:Arial, Helvetica, sans-serif; background:#eef2f7; color:#111827; line-height:1.6;">
  <div style="max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

    <h2 style="margin:0 0 10px 0; color:#000;">Apex Athletics Gym</h2>
    <p style="margin:0 0 20px 0; color:#555;">Class Schedule Confirmation</p>

    <p>Hi <strong style="color:#2563eb;">${user.name}</strong>,</p>
    <p>Your class has been <strong style="color:#16a34a;">successfully booked</strong>. Here are the details:</p>

    <p><strong>Class:</strong> ${scheduleTime.class.toUpperCase()}</p>
    <p><strong>Training Name:</strong> ${scheduleTime.trainingName.toUpperCase()}</p>
    <p><strong>Date:</strong> ${classDate.toDateString()}</p>
    <p><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</p>
    <p><strong>Status:</strong> Confirmed ✅</p>

    <p style="margin-top:20px; font-size:13px; color:#6b7280;">
      Please arrive 10 minutes early and carry your workout essentials.
    </p>

    <p style="margin-top:30px; font-size:11px; color:#9ca3af; text-align:center;">
      © ${new Date().getFullYear()} Apex Athletics Gym
    </p>

  </div>
</body>
</html>
  `,
    });

    console.log("✅ Cancellation email sent to:", user.email);

  } catch (err) {
    console.error("❌ Email background error:", err.message);
  }
};
