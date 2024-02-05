// components/CrispChatbot.tsx

import React from 'react';
import { Helmet } from 'react-helmet';

const CrispChatbot: React.FC = () => (
  <Helmet>
    <script type="text/javascript">
      {`
        window.$crisp=[];
        window.CRISP_WEBSITE_ID="89d192b1-26a1-4c49-b001-60b3daf7571d";
        (function(){
          var d=document;
          var s=d.createElement("script");
          s.src="https://client.crisp.chat/l.js";
          s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </script>
  </Helmet>
);

export default CrispChatbot;
