import React from 'react';

function ErrorSVG({w = 15, h = 16}: any): JSX.Element {
  return (
    <svg width={w} height={h} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.59975 0.999985C10.1998 1.09999 11.6998 1.89999 12.7998 2.99999C14.0998 4.39999 14.7998 6.09999 14.7998 8.09999C14.7998 9.69999 14.1998 11.2 13.1998 12.5C12.1998 13.7 10.7998 14.6 9.19975 14.9C7.59975 15.2 5.99975 15 4.59975 14.2C3.19975 13.4 2.09975 12.2 1.49975 10.7C0.899753 9.19999 0.799753 7.49999 1.29975 5.99999C1.79975 4.39999 2.69975 3.09999 4.09975 2.19999C5.39975 1.29999 6.99975 0.899985 8.59975 0.999985ZM9.09975 13.9C10.3998 13.6 11.5998 12.9 12.4998 11.8C13.2998 10.7 13.7998 9.39999 13.6998 7.99999C13.6998 6.39999 13.0998 4.79999 11.9998 3.69999C10.9998 2.69999 9.79975 2.09999 8.39975 1.99999C7.09975 1.89999 5.69975 2.19999 4.59975 2.99999C3.49975 3.79999 2.69975 4.89999 2.29975 6.29999C1.89975 7.59999 1.89975 8.99999 2.49975 10.3C3.09975 11.6 3.99975 12.6 5.19975 13.3C6.39975 14 7.79975 14.2 9.09975 13.9ZM7.89974 7.5L10.2997 5L10.9997 5.7L8.59974 8.2L10.9997 10.7L10.2997 11.4L7.89974 8.9L5.49974 11.4L4.79974 10.7L7.19974 8.2L4.79974 5.7L5.49974 5L7.89974 7.5Z" fill="#F48771"/>
    </svg>
  )
}

export default ErrorSVG;