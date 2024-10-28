"use client";

import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import Image from 'next/image';

interface Props {}

function Topbar(props: Props) {
  const {} = props;

  return (
    <>
  
      <Navbar
        fluid={true}
        rounded={true}
        className="bg-white border-b border-gray-200 fixed z-30 w-full px-3 py-3"
      >
        <Navbar.Brand href="/">
        <Image
            src={"/logo.svg"}
            className="h-10"
            width={250}
            height={200}
            alt=""
          />
        </Navbar.Brand>
        {/* <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User Image"
              img="/img/placeholder.png"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Kevin Gautier</span>
            <span className="block truncate text-sm font-medium">
              kevin@tike.rw
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item> */}
        {/* </Dropdown> */}
      </Navbar>
    </>
  );
}

export default Topbar;
