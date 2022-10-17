import React, { useState } from 'react';
import parse from 'html-react-parser';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { settleAsTitleCase } from '../utils';
import Link from '@mui/material/Link';

export default function SingleProductDescription({ product }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const description = parse(`${showFullDescription ? product.product_data.description : product.product_data.description.substring(0, 70) + '...'}`);

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="product image" src={product.image.src} />
            </ListItemAvatar>
            {/* <ListItemText
                primary={settleAsTitleCase(product.name)}
                secondary={
                    <React.Fragment>
                        <Typography sx={{ display: 'inline' }} component="div" variant="body2" color="text.primary">
                            {description}
                            <Link component="button" underline="hover" variant="caption" onClick={() => setShowFullDescription(!showFullDescription)}>
                                {showFullDescription ? 'ver menos' : 'ver mas'}
                            </Link>
                        </Typography>
                        <br />
                        {`${product.quantity} x $ ${product.price} `}
                    </React.Fragment>
                }
            /> */}
            <ListItemText
                primary={settleAsTitleCase(product.name)}
                secondary={
                    <Typography sx={{ display: 'inline' }} component="div" variant="body2" color="text.primary">
                        {description}
                        <Link component="button" underline="hover" variant="caption" onClick={() => setShowFullDescription(!showFullDescription)}>
                            {showFullDescription ? 'ver menos' : 'ver mas'}
                        </Link>
                    </Typography>
                }
            />
            <br />
            {`${product.quantity} x $ ${product.price} `}
        </ListItem>
    );
}
