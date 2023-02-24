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

const openCloseSucessModal = (navigateLoc: string, reload: boolean, dispatchFun: Function, navigateFunc: Function): void => {
    dispatchFun(setOpenModalSucessLoad(true));
          setTimeout(() => {
            dispatchFun(setOpenModalSucessLoad(false));
            navigateFunc(`${navigateLoc}`);
            if(reload)  {
                window.location.reload();
            }
          }, 2000);
 };

 export {
    openCloseSucessModal
  };
 