import React from 'react'
import HrService from '../../../services/hr.service';
import { useEffect } from 'react';
import { useState } from 'react';
import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer,Grid, Box, Dialog, Snackbar, Alert} from '@mui/material';
import SearchJob from './SearchJob';
import { ChairOutlined, ChangeCircle, CurrencyRupeeSharp, Timelapse } from '@mui/icons-material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import employeeService from '../../../services/employee.service';
const AllJob = (props) => {
      const [open,setOpen]=useState(false);
      const[success,setSuccess]=useState(false);
      const[error,setError]=useState(false);
      const[d,setD]=useState(null);
     const {empid}=useParams();
     const [applied,setApplied]=useState([]);
          //  const colors=["#e3dbfa","#fbe2f4","#ffe1cc",'#d4f6ed'];
    useEffect(()=>{
getAlljobDetails();
},[])
    
    const getAlljobDetails = () => {
        HrService.getAllJobs().then((response) => {
            props.setJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }


    const ApplyforJob=(jobId)=>{
      const obj={};
      employeeService.applyforJob(empid,jobId,obj).then((response)=>{
        if(response.data.length==0){
        setError(true);
              setOpen(false);
        }
        else{
setSuccess(true);
      setOpen(false);
        }
      })
    }
    const openDrawer=(index)=>{
setOpen(true);
setD(index);
    }


  return (
    <>
         <Snackbar open={success}
            anchorOrigin={{vertical:"top",horizontal:"center"}}
            onclose={()=>setSuccess(false)}
            sx={{width:400,marginTop:20}}
            autoHideDuration={5000}
            >
                <Alert severity="success" variant="filled" onClose={()=>setSuccess(false)}>
                    SuccessFully Applied
                </Alert>
            </Snackbar>
              <Snackbar open={error}
            anchorOrigin={{vertical:"bottom",horizontal:"center"}}
            onclose={()=>setSuccess(false)}
            sx={{width:400,marginTop:20}}
            autoHideDuration={5000}
            >
                <Alert severity="error" variant="filled" onClose={()=>setError(false)}>
                    Already  Applied
                </Alert>
            </Snackbar>

    <h4 style={{margin:"50px 34px"}}>Recommended Jobs : 12</h4>
    <Grid container>

{
  props.job &&  props.job.map((j,index)=>
    {
      const date=new Date(j.publish_date);
      const currdate=new Date();
      var diff=currdate.getDate()-date.getDate();
      return (
    <>
    
          <Card style={{width:240,height:200,border:"1px solid",margin:"5px",borderColor:"white",borderRadius:20,backgroundColor:"white"}}>
            <Stack>
              <Button variant="contained" sx={{bgcolor:"white",margin:"10px 20px",width:"120px",height:30,color:"black",border:"0px solid white",borderRadius:2,fontSize:10}} >{diff} days ago</Button>
               <Typography style={{fontSize:15,margin:"10px 20px 0px "}}>{j.category}</Typography>   
    <Typography style={{fontSize:20,fontWeight:'bolder',color:"#98144d",margin:"0px 20px"}}>{j.jobProfile}</Typography>   
<Stack direction="row" sx={{mt:4}}>
  <Stack>
           <Typography style={{fontSize:15,margin:"15px 20px"}}>Rs.{j.salary} </Typography>   

       {/* <Typography style={{fontSize:12,margin:"-10px 20px",fontWeight:"bolder"}}>{j.lastdate[2]}/{j.lastdate[1]}/{j.lastdate[0]}</Typography>    */}
</Stack>
<Button variant="outlined"  onClick={()=>{openDrawer(index)}} style={{width:70,height:30,backgroundColor:"white",color:"#98144d",margin:"15px",borderColor:"#98144d"}}>
  <Typography style={{fontSize:10}}>Details</Typography></Button>  
  </Stack>
 
{d!=null && <Drawer
variant="persistent"
      anchor='right'
      open={open}
      onClose={()=>setOpen(false)}
      PaperProps={{sx:{width:330,mt:9}}}
    >

 {d!=null  && 
 <Stack padding="2px">
      <Typography style={{fontSize:20,fontWeight:'bolder',color:"#98144d",margin:"0px 30px",textAlign:'center'}}>{(props.job[d]).jobProfile}</Typography>  
       <Stack direction='row' mt={2} ml={3} marginBottom={4}>
        <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><CurrencyRupeeSharp/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Salary</Typography>  

        <Typography style={{fontSize:15}}>Rs.{props.job[d].salary}</Typography>  

        </div>
          <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><Timelapse/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>job Type</Typography>  

        <Typography style={{fontSize:15}}>{props.job[d].jobType}</Typography>  

        </div>
          <div>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><ChairOutlined/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Position</Typography>  

        <Typography style={{fontSize:15}}>{props.job[d].position}</Typography>  

        </div>
      </Stack>
      <Stack ml={5}>
               <Typography style={{fontSize:15,margin:"1px 0px",color:"#5d6c72"}}>Team :{props.job[d].category}</Typography>  
               <Typography style={{fontSize:15,margin:"3px 0px",color:"#5d6c72"}}>Published at: {props.job[d].publish_date[2]}/{props.job[d].publish_date[1]}/{props.job[d].publish_date[0]}</Typography>   
</Stack> 
    
<Stack ml={5} mt={2}>
      <h5>Description</h5>
      <Typography color="#5d6c72">{props.job[d].description}</Typography>
      <Typography mt={4} color="#5d6c72">{props.job[d].specialization}</Typography>
      <Divider mt={3}/> 
            <Typography mt={4} color="#909fa5">Last Date to Apply :<strong>{props.job[d].lastdate[2]}/{props.job[d].lastdate[1]}/{props.job[d].lastdate[0]}</strong></Typography>
   <Typography mt={2} color="#909fa5">No of Vacancy:<strong>{props.job[d].vacancy}</strong></Typography>
 </Stack>
    <Stack direction="row" mt={1} ml={5}>
                 <Stack direction="row" mt={1}>
            <Button variant="outlined"  onClick={()=>{
              setOpen(false);
              setD()}} style={{width:110,height:40,color:'black'}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Cancel</Typography></Button>  
 {/* {<Button variant="outlined"  disabled style={{width:150,height:40,backgroundColor:"purple",color:"white",marginLeft:10}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Applied</Typography></Button>  }  */}
   {applied && <Button variant="outlined"  onClick={()=>{ApplyforJob(props.job[d].jobId)}} style={{width:150,height:40,backgroundColor:"#98144d",color:"white",marginLeft:10}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Apply now</Typography></Button>  }
            {/* <Button variant="contained"  onClick={()=>{
              props.setOpen(false);
              props.setD()}} style={{width:110,height:40,backgroundColor:'#98144d',color:"white"}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Close</Typography></Button>   */}

 
 
  </Stack>
      </Stack>
      </Stack>
    }
            </Drawer>
    }
            </Stack>
</Card>


  </>
      )
    }
   ) }
   </Grid>

</>
  )
}

export default AllJob