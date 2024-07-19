import React from 'react';
import { Helmet } from 'react-helmet';

const ChatBot = () => {
    return (
        <div>
            <Helmet>
                <script>
                    {`
                        window.embeddedChatbotConfig = {
                            chatbotId: "GTKhgKWFggU6ub6m8N_Bh",
                            domain: "www.chatbase.co"
                        }
                    `}
                </script>
                <script src="https://www.chatbase.co/embed.min.js" chatbotId="GTKhgKWFggU6ub6m8N_Bh" domain="www.chatbase.co" defer />
            </Helmet>
            
        </div>
    );
};

export default ChatBot;