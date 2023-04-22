import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notificationsType } from '../../utility/constants';

function Notifications(props) {
  const { type, message, errorStack } = props;
  const errorToast = () =>
    toast.error(
      <div style={{ textAlign: 'center' }}><span>
      {message}</span> <br /> {errorStack}</div>,
      {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      }
    );

  const warningToast = () =>
    toast.warn(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      className: 'tost_warning'
    });

  const successToast = () => toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const infoToast = () =>
    toast.info(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    //   theme: 'colored',
      className: 'information_warning'
    });

  const renderNotification = (param) => {
    switch (param) {
      case notificationsType.ERROR:
        return errorToast();
      case notificationsType.SUCCESS:
        return successToast();
      case notificationsType.WARNING:
        return warningToast();
      case notificationsType.INFORAMTION:
        return infoToast();
    }
  };

  return (
    <div>
      {renderNotification(type)}
    </div>
  );
}

export default Notifications;