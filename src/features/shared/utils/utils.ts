/* eslint-disable react-hooks/rules-of-hooks */
import { setOpenModalSucessLoad } from '../../../app/core/core.reducer';


/**
 * Function That show sucess modal
 * @param navigateLoc navigate location
 * @param reload is need to be relooad
 * @param dispatchFun dispatch function
 * @param navigateFunc navigarte function
 * @returns void
 */

const openCloseSucessModal = (navigateLoc: string, reload: boolean, dispatchFun: Function, navigateFunc: Function, stateNavigate?: any): void => {
    const stateTmp = stateNavigate ? ({state : stateNavigate})  :  '';
    dispatchFun(setOpenModalSucessLoad(true));
          setTimeout(() => {
            dispatchFun(setOpenModalSucessLoad(false));
            navigateFunc(`${navigateLoc}`,  stateTmp);
            if(reload)  {
                window.location.reload();
            }
          }, 2000);
 };

 /**
 * Function That show error modal
 * @param navigateLoc navigate location
 * @param reload is need to be relooad
 * @param dispatchFun dispatch function
 * @param navigateFunc navigarte function
 * @returns void
 */

const openCloseErrorModal = (navigateLoc: string, reload: boolean, dispatchFun: Function, navigateFunc: Function, stateNavigate?: any): void => {
    const stateTmp = stateNavigate ? ({state : stateNavigate})  :  '';
    dispatchFun(setOpenModalSucessLoad(true));
          setTimeout(() => {
            dispatchFun(setOpenModalSucessLoad(false));
            navigateFunc(`${navigateLoc}`,  stateTmp);
            if(reload)  {
                window.location.reload();
            }
          }, 2000);
 };


 export {
    openCloseSucessModal,
    openCloseErrorModal
  };
 