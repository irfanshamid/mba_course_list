import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Button from './button';
import {ReactComponent as Preview} from './../assets/preview.svg'


const TitleComponent = styled.div`
    padding: 30px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TitlePart = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const TitleDesc = styled.h2`
    padding: 10px p;
`;

const TitleDate = styled.small`
    padding: 20px 20px 10px;
    color: #8189A2;
    font-size: 12px;
`;


export default function Title ({desc, date, preview, onPreview}) {
    return (
        <TitleComponent>
            <TitlePart>
                <TitleDesc>
                    {desc} 
                </TitleDesc>

                <TitleDate>
                    Last Updated {date}
                </TitleDate>
            </TitlePart>

            {preview &&
                <Button onClick={onPreview}>
                    <Preview style={{marginRight: '10px'}}/> Preview
                </Button>
            }
        </TitleComponent>
    );
};

Title.propTypes = {
    preview : PropTypes.bool, 
    onPreview : PropTypes.func,
    desc : PropTypes.string,
    date : PropTypes.string,
};