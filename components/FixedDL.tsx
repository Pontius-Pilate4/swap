import React from "react";
import "../styles/fixeddl.css";

const Loader = () => {
    return (
        <div className="container">
            <div className="left_side">
                <div>
                    <b> Pi Network </b>
                </div>
                <div id="download_referral">Start mining. Easy as Pi!</div>
            </div>{" "}
            <div className="right_side">
                {" "}
                <a
                    className="download_app"
                    target="_blank"
                    id="footer_download"
                    href="https://play.google.com/store/apps/details?id=com.blockchainvault"
                >
                    {" "}
                    Download{" "}
                </a>
            </div>
        </div>
    );
};

export default Loader;
