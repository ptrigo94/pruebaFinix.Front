import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import{show_alert} from '../utils/functions';
const ShowBanks = () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const [banks, setBanks] = useState([]);
    let [id,setId] = useState('');
    const [title, setTitle] = useState('');
    const [uId,setUid] = useState('');
    const [AccountNumber, setAccountNumber]= useState('');
    const [Iban, setIban]= useState('');
    const [BankName, setBankName]= useState('');
    const [RoutingNumber, setRoutingNumber]= useState('');
    const [SwiftBic, setSwiftBic]= useState('');
    useEffect ( ()=>{
        getBanks();
    },[])



    const getBanks = async () =>{
        const resp  = await axios.get(`${url}/Banks/GetBanks`)
        setBanks(resp.data);
    }
    const openModal = (op) =>{
        
        setUid('');
        setAccountNumber('');
        setIban('')
        setBankName('')
        setRoutingNumber('');
        setSwiftBic('');
        if (op == 1) {
            setTitle('Add Bank')
        window.setTimeout(function (){
            document.getElementById('BankUId').focus();
        }, 500);
        
        }
    }
    const validar= () =>{
        var param;
        var method = 'POST';
        if(BankName.trim() =="") {
            show_alert('Please write the bank Name')
        }
        if(uId.trim() =="") {
            show_alert('Please write the bank uid')
        }if(AccountNumber.trim() =="") {
            show_alert('Please write the bank AccountNumber')
        }if(Iban.trim() =="") {
            show_alert('Please write the bank Iban')
        }if(RoutingNumber.trim() =="") {
            show_alert('Please write the bank RoutingNumber')
        }if(SwiftBic.trim() =="") {
            show_alert('Please write the bank SwiftBic')
        }
        param = {
            uid: uId,
            accountNumber: AccountNumber,
            iban: Iban,
            bankName: BankName,
            routingNumber: RoutingNumber,
            swiftBic: SwiftBic
          }
        sendToAPI(method, param)
    }
    const sendToAPI = async (method, param) =>{
        let op ='';
        let controller = ''
        if (method == 'POST' ) {
            controller = 'CreateBank'
            op = 'created'
        }else if( method =='DELETE'){
            controller = 'DeleteBank'
            op = 'deleted'
        }
        await axios ({method: method, url: `${url}/Banks/${controller}`, data: param}).then( function( response){
            var type = response.status;
            var msj = response.data;
            console.log(response)
            if(type == 200){
                
                show_alert(`Bank ${response.data.bankName} ${op}  successfully` ,type);
                document.getElementById('btnClose').click();
                getBanks();
            }
        })
        .catch(function(error){
            show_alert('Error processing the request', 'error');
            console.log(error)
        })
    }
    const deleteBank = (id , name) =>{
        console.log(id, name)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title:'Are you sure you want to delete the bank ' + name+ '?',
            icon: 'question', text: '',
            showCancelButton:true, confirmButtonText:'Yes, delete', cancelButtonText: 'Cancel'
        }).then((result)=>{
            if(result.isConfirmed){
                setId(id);
                sendToAPI('DELETE',{uid:id});
            }else{
                show_alert('The bank was not deleted', 'info');
            }
        })
    } 

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalBanks'>
                                <i className='fa-solid fa-circle-plus'></i> Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th><th>Uid</th><th>Account Number</th><th>Iban</th><th>Bank Name</th><th>Routing Number</th><th>SwiftBic</th><th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {banks.map( (bank,id) => (
                                        <tr key={bank.id}>
                                            <td>{(id+1) }</td>
                                            <td>{bank.uid}</td>
                                            <td>{bank.accountNumber}</td>
                                            <td>{bank.iban}</td>
                                            <td>{bank.bankName}</td>
                                            <td>{bank.routingNumber}</td>
                                            <td>{bank.swiftBic}</td>
                                            <td>
                                                <button className='btn btn-warning' title='Edit' >
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                <button className='btn btn-danger' title='Delete' onClick={() => deleteBank(bank.uid, bank.bankName)}>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>


                                        </tr>
                                        
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
            </div>
            <div id='modalBanks' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text'id='BankUId' className='form-control' placeholder='uId' value={uId} onChange={(e) => setUid(e.target.value)}></input>
                                
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-key'></i></span>
                                <input type='text'id='AccountNumber' className='form-control' placeholder='AccountNumber' value={AccountNumber} onChange={(e) => setAccountNumber(e.target.value)}></input>
                            
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-book'></i></span>
                                <input type='text'id='Iban' className='form-control' placeholder='Iban' value={Iban} onChange={(e) => setIban(e.target.value)}></input>
                                
                                
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text'id='bankName' className='form-control' placeholder='Bank Name' value={BankName} onChange={(e) => setBankName(e.target.value)}></input>
                                
                                
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-user-secret'></i></span>
                                <input type='text'id='RoutingNumber' className='form-control' placeholder='RoutingNumber' value={RoutingNumber} onChange={(e) => setRoutingNumber(e.target.value)}></input>
                                
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-font'></i></span>
                                <input type='text'id='SwiftBic' className='form-control' placeholder='SwiftBic' value={SwiftBic} onChange={(e) => setSwiftBic(e.target.value)}></input>
                                
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button className='btn btn-success' onClick={() => validar()}>
                                    <i className='fa-solid fa-floppy-disk'> Save</i>
                                </button>

                            </div>
                               
                                
                        </div>
                        <div className='modal-footer'>
                            <button id='btnClose' type='button' className='btn btn-secondary' data-bs-dismiss='modal'> Close</button>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShowBanks