import swal from 'sweetalert';
import { ErrorMessageInterpolationService } from './ErrorMessageInterpolation';

export const SWAL_COVER_DEFAULT_TITLE = 'Lỗi'
export const SWAL_COVER_DEFAULT_MSG = 'Vui lòng thử lại'

export function SwalCover(defaultMsg?, title?) {
    defaultMsg = defaultMsg || SWAL_COVER_DEFAULT_MSG
    return (target, key, desc) => {
        const method = desc.value;

        desc.value = async function (...args) {
            try {
                const ret = await Promise.resolve(method.apply(this, args))
                return ret;
            }
            catch (err) {
                console.error(err)
                const msg = ErrorMessageInterpolationService.interpolate(err, defaultMsg);
                swal(title || SWAL_COVER_DEFAULT_TITLE, msg, 'error');
            }
        }

        return desc;
    }
}

export function SwalLoading(title: string = "Loading...") {
    return (target, key, desc) => {
        const method = desc.value;

        desc.value = async function (...args) {
            try {
                swal({
                    title: title,
                    closeOnEsc: false,
                    closeOnClickOutside: false,
                    buttons: {
                        closeModal: false
                    }
                })
                return await Promise.resolve(method.apply(this, args))
            }
            catch (err) {
                throw err
            }
            finally {
                swal.stopLoading()
            }
        }

        return desc;
    }
}

export default SwalCover;