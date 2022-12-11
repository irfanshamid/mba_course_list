import Session from "../components/session";

export default {
    data: {
        part:{
            desc:'Belajar dan praktek cinematic videography',
            date: '18 October 2021 | 13:23',
        },
        
        tabList: [
            {idx: 1, name: 'Curricullum'}
        ],
        
        sessionList: [
            {
                idx: 1, 
                name: 'Session 1',
                list: [
                    {
                        type: 1,
                        required: true,
                        preview: true,
                        date: '24 Oktober 2021, 16:30',
                        time: '06:30',
                        download: true,
                        file: 'https://www.youtube.com/shorts/y5_UMhm7BXI'
                    },
                    {
                        type: 2,
                        required: true,
                        preview: true,
                        date: '24 Oktober 2021, 16:30',
                        time: '06:30',
                        download: true,
                        file: 'https://www.youtube.com/shorts/y5_UMhm7BXI'
                    }
                ]
            },
            {
                idx: 2, 
                name: 'Session 2',
                list: [
                    {
                        type: 1,
                        required: true,
                        preview: true,
                        date: '24 Oktober 2021, 16:30',
                        time: '06:30',
                        download: true,
                        file: 'https://www.youtube.com/shorts/y5_UMhm7BXI'
                    },
                ]
            }
        ]
    }
} 
