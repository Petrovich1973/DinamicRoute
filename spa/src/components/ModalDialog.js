import React from 'react'
import classnames from 'classnames'

const ModalDialog = ({
                         title = 'Title Dialog',
                         children = <div/>,
                         className = '',
                         colorScheme = '',
                         onClose = () => console.log('ModalDialog onClose')
                     }) => {
    return (
        <div className="modal">
            <div
                className="overlay"
                onClick={onClose}/>
            <div className="dialog align-left">
                <div className={classnames("dialog-header", colorScheme)}>
                    <h4
                        title={title}
                        className="dialog-header__title">{title}</h4>
                    <button
                        className="dialog-header__close scheme-transparent"
                        onClick={onClose}>&#10006;</button>
                </div>
                <div className="dialog-main">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalDialog