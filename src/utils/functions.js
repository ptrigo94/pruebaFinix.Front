
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export function show_alert(messaje,icon,focus =''){
    onFocus(focus);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:messaje,
        icon:icon
    });
}
function onFocus(focus){
    if (focus !== ''){
        document.getElementById(focus).focus();
    }
}
export default show_alert