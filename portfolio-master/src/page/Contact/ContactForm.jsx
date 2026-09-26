function ContactForm() {
  return (
    <div className=" relative top-10 w-full flex justify-center items-center bg-[#0d0d0d] p-4">
      
      <form
        action="https://formsubmit.co/your-email-token"
        method="POST"
        className="w-full h-200 max-w-lg bg-[#111111] border border-gray-800 shadow-2xl rounded-2xl p-8 flex flex-col gap-6"
      >
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-white text-center mb-2">
          Contact Me
        </h2>
        <p className="text-gray-400 text-center text-sm mb-4">
          Fill out the form below and I'll get back to you.
        </p>

        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            required
            className="bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            required
            className="bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            required
            className="bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Gender</label>
          <select
            name="gender"
            required
            className="bg-[#1a1a1a] border border-gray-700 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="male" className="text-black">Male</option>
            <option value="female" className="text-black">Female</option>
            <option value="other" className="text-black">Other</option>
          </select>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
            className="bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            name="rememberMe"
            className="w-4 h-4 accent-blue-600"
          />
          Remember Me
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg"
        >
          Submit
        </button>

        {/* Hidden */}
        <input type="hidden" name="_captcha" value="false" />
      </form>

    </div>
  );
}

export default ContactForm;
