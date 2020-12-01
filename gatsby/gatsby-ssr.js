import React from 'react'
import Layout from './src/components/Layout'
import { OrderProvider } from './src/components/OrderContext'
export function wrapPageElement({ element, props }) {
    return <Layout {...props}>{element}</Layout>
}

export function wrapRootElement({ element }) {
    return <OrderProvider>{element}</OrderProvider>
}

// export const onRenderBody = ({ setPostBodyComponents }) => {
//     setPostBodyComponents([
//         <script crossorigin src="https://unpkg.com/@daily-co/daily-js" />,
//         <script
//             key="daily_chat"
//             dangerouslySetInnerHTML={{
//                 __html: `
//             allFrame = window.DailyIframe.createFrame();
//             callFrame.join({ url: 'https://mdog.daily.co/hello-daily' });
//             `,
//             }}
//         />,
//     ])
// }
