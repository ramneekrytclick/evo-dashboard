"use client"
import { useAuth } from "@/app/AuthProvider";
import { Href, ImagePath } from "@/Constant";
import { userProfileData } from "@/Data/Layout/Header";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { LogOut } from "react-feather";

const UserProfile = () => { 
  const {logout,user,userEmail} = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <li className='profile-nav onhover-dropdown p-0'>
      <div className='d-flex align-items-center profile-media'>
        {/* <Image className='b-r-10 img-40 img-fluid' width={40} height={40} src={session?.user?.image || `${ImagePath}/dashboard/profile.png`} alt='' /> */}
        <div className='flex-grow-1'>
          <span>{userEmail+"r"}</span>
          <p className='mb-0'>{ 'UI Designer'}</p>
        </div>
      </div>
      <ul className='profile-dropdown onhover-show-div'>
        {/* {userProfileData.map((item, index) => (
          <li key={index}>
            <Link href={`/${item.link}`}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))} */}
        <li onClick={handleLogout}>
          <Link href={Href}>
            <LogOut />
            <span>{"Log out"}</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};
export default UserProfile;
