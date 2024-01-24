
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const allowedCrispPath = ['/'];

const CrispScript = () => {

    const location = useLocation();
    const pathname = location.pathname;


    useEffect(() => {
        if (!window) {
            return;
        }

        if (!allowedCrispPath.includes(pathname)) {
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = null;
        } else {
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = 'f9f51aab-b6ea-4b45-8cc1-09132e60afa4';
            const script = document.createElement('script');
            script.src = 'https://client.crisp.chat/l.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [pathname]);

    return null; 
};

export default CrispScript;

