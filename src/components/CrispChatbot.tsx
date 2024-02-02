// components/CrispChatbot.tsx

import React from 'react';
import { Helmet } from 'react-helmet';

const CrispChatbot: React.FC = () => (
  <Helmet>
    <script type="text/javascript">
      {`
        window.$crisp=[];
        window.CRISP_WEBSITE_ID="b60768d8-b430-4bd7-aa52-f65fab02911f";
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
