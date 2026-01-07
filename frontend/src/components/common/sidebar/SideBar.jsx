import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../../../assets/images";
import {
  SvgCompany,
  SvgDashboard,
  SvgLogout,
  SvgOverall,
  SvgSales,
  SvgSetting,
  SvgUserIcon,
  SvgCustomerIcon,
  SvgMarketingIcon,
  SvgFinancialIcon,
  SvgPromoIcon,
  SvgSystemReportIcon,
} from "./svg/Svg";

const SideBar = () => {





  const handleLogout = () => {
    console.log("logout clicked");
    // Clear token / user data from localStorage or Redux
    localStorage.removeItem("access_token");
    localStorage.removeItem("fcm_token");
    localStorage.removeItem("isLogin");
     localStorage.removeItem("userId");

    localStorage.removeItem("UserType");

    // Optionally: reset redux state here if needed

    // Redirect to login page
    window.location.href = "/login";
  };








  const sidebarMenu = [
    {
      name: "Dashboard",
      link: "/",
      svg: <SvgDashboard />,
    },

    {
      name: "User",
      link: "/user",
      svg: <SvgUserIcon />,
    },
    {
      name: "Vendor",
      link: "/vendor",
      svg: <SvgCompany />,
    },
    {
      name: "Financial Reports",
      svg: <SvgFinancialIcon />,
      submenus: [
        {
          name: "Revenue Report",
          link: "/revenue-report",
        },
        {
          name: "Transaction Report",
          link: "/transaction-report",
        },
        {
          name: "Commission Report",
          link: "/commission-report",
        },
        {
          name: "Tax Report",
          link: "/tax-report",
        },
      ],
    },
    {
      name: "Support Reports",
      svg: <SvgSales />,
      submenus: [
        {
          name: "Support List",
          link: "/support-list",
        },
        {
          name: "Customer Complaints Report",
          link: "/customer-complaints",
        },
        {
          name: "Service Provider Issues Report",
          link: "/service-provider-issues",
        },

      ],
    },
    {
      name: "Services Reports",
      link: "",
      svg: <SvgSetting />,
      submenus: [
        {
          name: "Category",
          link: "/services-category",
        },
        {
          name: "Sub Category",
          link: "/services-subcategory",
        },
        {
          name: "Service Provider Performance",
          link: "/service-provider-performance",
        },
        {
          name: "Payout Report",
          link: "/payout-report",
        },
        {
          name: "Onboarding Report",
          link: "/onboarding",
        },
      ],
    },
    {
      name: "Customer Reports",
      link: "",
      svg: <SvgCustomerIcon />,
      submenus: [
        {
          name: "Booking History",
          link: "/booking-history",
        },
        {
          name: "Customer Activity",
          link: "/customer-activity",
        },
        {
          name: "Customer Feedback Report",
          link: "/customer-feedback-report",
        },
      ],
    },
    {
      name: "Marketing ",
      link: "",
      svg: <SvgMarketingIcon />,
      submenus: [
        {
          name: "Promo Campaign Report",
          link: "/promo-campaign-report",
        },
        {
          name: "User Engagement Report",
          link: "/user-engagement-report",
        },
        {
          name: "Push Notification Report",
          link: "/push-notification-report",
        },
      ],
    },
    {
      name: "System Reports",
      link: "",
      svg: <SvgSystemReportIcon />,
      submenus: [
        {
          name: "App Performance Report",
          link: "/app-performance-report",
        },
        {
          name: "User Device & OS Report",
          link: "/user-device-os-report",
        },
      ],
    },

    {
      name: "Booking History",
      link: "/booking-list",
      svg: <SvgOverall />,
    },

    {
      name: "Promo Management",
      link: "",
      svg: <SvgPromoIcon />,
      submenus: [
        {
          name: "Coupon",
          link: "/coupon",
        },
        {
          name: "Banner",
          link: "/banner",
        },
        {
          name: "Reward Point",
          link: "/reward-point",
        },
      ],
    },
    {
      name: "Setting",
      link: "",
      svg: <SvgSetting />,
      submenus: [
        {
          name: "Profile",
          link: "/my-profile",
        },
      ],
    },
    {
      name: "Logout",
      // link: "/login",
      action: handleLogout,
      svg: <SvgLogout />,
    },
  ];

  const location = useLocation();
  const activePath = location.pathname;
  const activeSubMenus = sidebarMenu.findIndex((item) =>
    item.submenus?.some((subMenus) => activePath.startsWith(subMenus.link))
  );

  const [expandSubMenus, setExpandSubMenus] = useState(activeSubMenus);

  const handleToggle = (idx) => {
    setExpandSubMenus((prevExpanded) => (prevExpanded === idx ? null : idx));
  };

  const addClass = () => {
    document.body.classList.toggle("open-sidebar");
  };

  return (
    <aside className="sidenav">
      <div className="sidebar-top">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div class="navmenu-sidbar">
          <div class="navbar-icon" onClick={addClass}>
            <span></span>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <ul>
          {sidebarMenu.map((menus, idx) => (
            <li
              key={idx}
              className={`menu-item here  ${idx === expandSubMenus && menus.submenus ? "menu-accordion" : ""
                }`}
            >
              {/* <Link
                onClick={() => handleToggle(idx)}
                to={!menus.submenus && menus.link}
                className={`menu-link
                ${expandSubMenus === idx ? "active" : ""}
                ${!menus.submenus && activePath === menus.link ? "active" : ""}`}>
                <span className="menu-icon">{menus.svg}</span>
                <span className="menu-title">{menus.name}</span>
                {menus.submenus && <span className="menu-arrow"></span>}
              </Link> */}


              <Link
                onClick={() => {
                  if (menus.action) {
                    menus.action(); // For logout
                  } else {
                    handleToggle(idx);
                  }
                }}
                to={!menus.submenus && !menus.action ? menus.link : "#"}
                className={`menu-link
    ${expandSubMenus === idx ? "active" : ""}
    ${!menus.submenus && activePath === menus.link ? "active" : ""}`}
              >
                <span className="menu-icon">{menus.svg}</span>
                <span className="menu-title">{menus.name}</span>
                {menus.submenus && <span className="menu-arrow"></span>}
              </Link>


              {menus.submenus && (
                <div
                  className={`menu-sub menu-sub-accordion menu-active-bg overflw-hdn ${expandSubMenus === idx ? "max-h-400" : "max-h-0"
                    }`}
                >
                  {menus.submenus &&
                    menus.submenus.map((subMenus, subIdx) => (
                      <div key={subIdx} className={`menu-item`}>
                        <Link
                          className={`menu-link ${activePath === subMenus.link ? "active" : ""
                            }`}
                          to={subMenus.link}
                        >
                          <span className="menu-bullet">
                            <span className="bullet bullet-dot"></span>
                          </span>
                          <span className="menu-title">{subMenus.name}</span>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
