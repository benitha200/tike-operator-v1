function Footer() {
  return (
    <>
      <ul className="flex flex-wrap justify-center items-center">
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            Terms and conditions
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            Licensing
          </a>
        </li>
      </ul>
      <p className="text-center text-sm text-gray-500 my-4">
        &copy; {"2023 Tike. All rights reserved."}
      </p>
    </>
  );
}

export default Footer;
