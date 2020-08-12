import React from 'react';

export const IconLogo = props => {
    const {size = '100%', style = {}, color = null} = props
    return (
        <svg
            style={style}
            height={size}
            width={size}
            fill={color || "currentColor"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 923 923"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path d="M846.2,172.7c-9.7-14-20.5-27-29.1-41L280.6,439.3l-259-149c-6.5,16.2-9.7,32.4-10.8,49.7l272,157.6L846.2,172.7z"/>
            <path d="M280.6,554.8L2.2,395C0,405.8,0,415.6,0,425.3C0,680,206.2,886.2,460.9,886.2S920.7,680,920.7,425.3c0-73.4-16.2-144.6-49.7-209.4L280.6,554.8z"/>
            <path d="M780.4,92.8c-13-11.9-27-23.7-41-34.5L280.6,322.7L59.4,197.5c-7.6,14-15.1,29.1-23.7,45.3l241.8,140.3L780.4,92.8z"/>
            <path d="M694,27c-17.3-10.8-35.6-19.4-54-27L280.6,207.2l-160.8-90.7c-10.8,10.8-21.6,24.8-32.4,38.9l192.1,110.1L694,27z"/>
        </svg>
    )
}