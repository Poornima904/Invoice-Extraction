import React from 'react';

const ProcessingPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Processing Invoice...</h1>
            <p>Your invoice is being processed. Please wait.</p>
            <div style={{ marginTop: 30 }}>
                <div className="loader" />
            </div>
            <style>
                {`
                    .loader {
                        border: 8px solid #f3f3f3;
                        border-top: 8px solid #3498db;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg);}
                        100% { transform: rotate(360deg);}
                    }
                `}
            </style>
        </div>
    );
};

export default ProcessingPage;