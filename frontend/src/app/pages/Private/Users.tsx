import React from 'react'
import { CustomButton } from '../../components/ui/Button'
import DataTable from '../../components/ui/Table'
import { Box } from '@mui/material';

const Users = () => {
    const tools = [
        {
            name: 'Jupyter Notebook',
            description: 'Interactive computing environment',
            url: 'https://jupyter.org/',
            color: 'bg-orange-500'
        },
        {
            name: 'Azure',
            description: 'Azure platformplatform',
            url: 'https://portal.azure.com/',
            color: 'bg-orange-600'
        },

        {
            name: 'TensorFlow',
            description: 'Machine learning platform',
            url: 'https://tensorflow.org/',
            color: 'bg-orange-600'
        },
        {
            name: 'Tableau',
            description: 'Data visualization platform',
            url: 'https://www.tableau.com/',
            color: 'bg-blue-600'
        },
        {
            name: 'Kaggle',
            description: 'Data science competitions',
            url: 'https://www.kaggle.com/',
            color: 'bg-blue-500'
        },
        {
            name: 'Google Colab',
            description: 'Cloud-based Jupyter notebooks',
            url: 'https://colab.research.google.com/',
            color: 'bg-yellow-500'
        },
        {
            name: 'Streamlit',
            description: 'Data apps framework',
            url: 'https://streamlit.io/',
            color: 'bg-red-500'
        }
    ];
    const [selectedTool, setSelectedTool] = React.useState(tools[0]);
    return (
        <div>
            <Box sx={{ height: 700, width: '100%' }}>
                <iframe
                    src={selectedTool.url}
                    title={selectedTool.name}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Box>
        </div>
    )
}

export default Users