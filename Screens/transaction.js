import React from "react"
import{Text,TouchableOpacity,View,StyleSheet} from "react-native"
import * as Permissions from "expo-permissions"
import{BarcodeScanner} from "expo-barcode-scanner"
export default class Transactionscreen extends React.Component{
    constructor(){
    super();
    this.state={
        hascamerapermission:null,
        scanned:false,
        scandata:"",
        Buttonstate:"normal"
    }
    }
getcamerapermissions=async()=>{
    const {status}=await Permissions.askAsync (Permissions.CAMERA)
    this.setState({
    hascamerapermission:status==="granted",
Buttonstate:"clicked",
scanned:false
    })
}
handleBarcodeScan= async({type,data})=>{
    this.setState({
        scanned:true,
        Buttonstate:"normal",
        scandata:data
    })
}
    render(){
        const hascamerapermission= this.state.hascamerapermission;
        const scanned=this.state.scanned;
        const Buttonstate=this.state.Buttonstate
        if(Buttonstate==="clicked" && hascamerapermission){
            return(
                <BarcodeScanner 
                onBarCodeScanned= {scanned ? undefined :this.handleBarcodeScan}
                style={StyleSheet.absoluteFillObject} />
            )
        }
        else if(Buttonstate==="normal"){
        return(
            <View style={styles.Container}>
                <Text style={styles.displayText}>{hascamerapermission===true ? this.state.scandata : "request camera permissions"}</Text>
                <TouchableOpacity style={styles.ScanButton} onPress={this.getcamerapermissions}>

                
                <Text style={styles.Buttontext}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )}
    }
}
const styles=StyleSheet.create({
    Container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    displayText:{
        fontSize:15,
        textDecorationLine:"underline"
    },
    ScanButton:{
backgroundColor:"blue",
padding:15,
margin:20
    },
    Buttontext:{
        fontSize:25
    }

}) 
