import socialLogo from '/social-color.png';
const Social = () => {
  return (
  <div className="container my-5 px-5"> 
   <p className="text-start lh-lg fs-5 mb-4">Welcome to Prolper Community!</p>
   <p className="text-start lh-lg fs-5 mb-4">Dear [Subscriber’s Name- To be picked up from sign up email]
Thank you for joining our community! We’re thrilled to have you on board.
</p>
<p className="text-start lh-lg fs-5 mb-4">As a subscriber, you can look forward to exclusive content, updates on new Categories,
seasonal recommendations and insights etc. We’re committed to providing you with
valuable insights and exciting updates</p>

<p className="text-start lh-lg fs-5 mb-4">If you have any questions or feedback, feel free to reach out. We love hearing from you!
</p>

<p className="text-start lh-lg fs-5 mb-4">Thank you once again for joining us. We can’t wait to share our journey with you.</p>

<p className="text-start lh-lg fs-5 mt-5 mb-5">Warm regards,
</p>

<p className="text-start fs-5">Customer Service
</p>
<p className="text-start fs-5">Prolper
</p>
<a className="text-start fs-5">www.prolper.com
</a>
<p className="text-start fs-5">Follow us on:</p>
<img className="" src={socialLogo} alt="Logo" width="320" height="80" />
<p className="text-start lh-lg fs-5 mt-4">To unsubscribe, kindly click here!</p>
  </div>
  );
};

export default Social;
