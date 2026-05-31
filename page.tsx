import React from 'react';

export default function HomePage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            fontFamily: 'sans-serif',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '300',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
            }}>
                Fizac Global
            </h1>
            <p style={{
                fontSize: '1rem',
                color: '#a3a3a3',
                letterSpacing: '0.05em',
                maxWidth: '500px',
                lineHeight: '1.6'
            }}>
                Luxury Storefront Initialization Complete. The platform is building successfully.
            </p>
        </div>
    );
}

