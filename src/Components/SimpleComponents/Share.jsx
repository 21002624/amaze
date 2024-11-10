// Share.js
import React from 'react';
import shareIcon from '../../icons/share.svg'; // Replace with your share icon path
import { toast } from 'react-hot-toast';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import './SimpleComponents.css';

const Share = ({ product }) => {
    const handleShare = () => {
        const shareData = {
            title: product.title,
            text: `Check out this product: ${product.title}`,
            url: window.location.href, // Current URL for sharing
        };

        // Use the Web Share API if supported
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => {
                    toast.success('Shared successfully!');
                })
                .catch((error) => {
                    console.error('Error sharing:', error);
                    toast.error('Failed to share.');
                });
        } else {
            // Fallback for browsers that don't support the Web Share API
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    toast.success('Link copied to clipboard!');
                })
                .catch((error) => {
                    console.error('Error copying to clipboard:', error);
                    toast.error('Failed to copy link.');
                });
        }
    };

    return (
        <div className='shareBtn' onClick={handleShare}>
            <ShareOutlinedIcon />
        </div>
        
    );
};

export default Share;
