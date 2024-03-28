import Layout from "../../components/layout/Layout";
import emailjs from '@emailjs/browser';
import React, { useRef } from "react";
import toast from "react-hot-toast";

function contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_0v595mp', 'template_pc6yw8c', form.current, {
        publicKey: 'xfgh37sK8nXdD-KAo',
      })
      .then(
        () => {
          toast.success("Form Submitted Successfully !!")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset();
  };

  return (
    <Layout>
      <h1 className="font-bold text-3xl text-center m-5">Feel Free to Contact Us</h1>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.196006817654!2d75.85502308682962!3d30.86019419904132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a828f09011b15%3A0xbf3f5b51dcc81b12!2sGuru%20Nanak%20Dev%20Engineering%20College!5e0!3m2!1sen!2sin!4v1711254788721!5m2!1sen!2sin"
          height="450"
          style={{border:0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="my-4 w-screen"
        ></iframe>
      </div>
      <div
        name="contact"
        className="w-full h-screen bg-gradient-to-b from-black to-gray-800 p-6 text-white"
      >
        <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
          <div className="pb-8">
            <p className="text-4xl font-bold inline border-b-4 border-gray-500">
              Contact
            </p>
            <p className="py-6">
              Submit the form below to get in touch with me
            </p>
          </div>

          <div className="flex justify-center items-center ">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col w-full md:w-1/2">
              <input
                type="text"
                name="user_name"
                autoComplete="off"
                required
                placeholder="Enter your name"
                className="p-2 bg-transparent border-2 shadow-lg shadow-gray-600 rounded-md text-white focus:outline-none"
              />
              <input
                type="email "
                name="user_email"
                required
                placeholder="Enter your email"
                className="my-6 p-2 bg-transparent border-2 rounded-md shadow-lg shadow-gray-600 text-white focus:outline-none"
              />
              <textarea
                placeholder="Enter your message"
                name="message"
                required
                rows="10"
                className="p-2 bg-transparent border-2 rounded-md text-white shadow-lg shadow-gray-600 focus:outline-none "
              ></textarea>
              <button type="submit" className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
                Let's talk
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default contact;
