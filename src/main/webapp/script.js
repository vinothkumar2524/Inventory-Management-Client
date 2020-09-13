document.onload = getNumberOfDevices();
document.onload = getLaptopCount();
document.onload = getHeadsetCount();
document.onload = getMonitorCount();
function ajaxFunction(method,URL)
{
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open(method,URL,true);
    return xmlRequest;
}
function getNumberOfDevices()
{
    var totalDeviceDiv = document.getElementById("totalDeviceDiv");
    var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/device/getTotalDevices');
    xmlRequest.onload = function()
    {
        totalDeviceDiv.innerHTML = xmlRequest.responseText;
        
    }
    xmlRequest.send();
}
function getAllDevices()
{
    
	var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/device');
	xmlRequest.onload = function()
	{
        var data = JSON.parse(xmlRequest.responseText);
        var getAllDevices = document.getElementById("getAllDevices");
        var allDevices = "" ; 
        for(i = 0 ; i < data.length ; i++)
        {
            allDevices += "<p> ID : "+data[i].id+" TYPE : "+data[i].deviceType +"BRAND : "+data[i].brand+ "</p>";
        }
        getAllDevices.innerHTML = allDevices;
	};
    xmlRequest.send();
}
function getDevice()
{
    var deviceId = document.getElementById("getDeviceId").value;
   
    var div = document.getElementById("div");
	var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/device/'+deviceId);
	xmlRequest.onload = function()
	{
        if(xmlRequest.status == 200)
        {
            var data = JSON.parse(xmlRequest.responseText);
         document.getElementById("getDeviceDiv").innerHTML = "ID : "+data.id+" TYPE : "+data.deviceType+" BRAND :"+data.brand;
        }
        else if(xmlRequest.status == 204)
        {
            document.getElementById("getDeviceDiv").innerHTML = "no such device found";
        }
        
	};
    xmlRequest.send();
}

    function checkDevice(deviceId)
    {
        console.log(deviceId);
    var div = document.getElementById("div");
	var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/device/'+deviceId);
	xmlRequest.onload = function()
	{
        if(xmlRequest.status == 200)
        {
            var data = JSON.parse(xmlRequest.responseText);
            console.log(data);
         document.getElementById("errorDiv").innerHTML = "Valid device".fontcolor("green");
        }
        else if(xmlRequest.status == 204)
        {
            document.getElementById("errorDiv").innerHTML = "no such device found".fontcolor("red");
        }
        
	};
    xmlRequest.send();
    }
    function addDevice()
    {
        var deviceId = document.getElementById("addDeviceId").value;
        var addDeviceType = document.getElementById("addDeviceType").value;
        var deviceBrand = document.getElementById("addDeviceBrand").value;
        var data = {id: deviceId,deviceType: addDeviceType, brand: deviceBrand};
        var toSend = JSON.stringify(data);
       
        var xmlRequest = ajaxFunction('POST','http://localhost:8080/restapi/device');
        xmlRequest.setRequestHeader("Content-Type","application/json");
        xmlRequest.send(toSend);
        xmlRequest.onload = function()
        {
            alert("Device added successfully");
            getAllDevices();
            getAllDevices();
            getLaptopCount();
            getMonitorCount();
            getHeadsetCount();
        }
        
    }
function getEmployee()
{
    
    var employeeId = document.getElementById("getEmployeeId").value;
  
    var xmlRequest1 = ajaxFunction('GET','http://localhost:8080/restapi/employee/emp/'+employeeId);
	xmlRequest1.onload = function()
	{
        if(xmlRequest1.status == 200)
        {
            console.log(data);
            var data = JSON.parse(xmlRequest1.responseText);
            alert(xmlRequest1.responseText);
            document.getElementById("get").innerHTML ="<b>ID : </b>"+data.id+"<b> NAME : </b>"+data.name+"<b> Devices : </b>"+data.deviceSet;
        }
        else if(xmlRequest1.status == 204)
        {
            alert("No such employee found");
        }
        else{
            console.log("data",data);
        }
        
	};
    xmlRequest1.send();
    
}
function getAllEmployees()
{
    var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/employee');
    var getAllEmployees = document.getElementById("getAllEmployees");
    xmlRequest.send();
    xmlRequest.onload = function ()
    {
        var data = JSON.parse(xmlRequest.responseText);
        var allEmployees= "";
        for(i = 0 ; i < data.length ; i++)
        {
            allEmployees += "<p><b>    ID : </b>"+data[i].id+"<b>    NAME : </b>"+data[i].name +"<b>    Devices : </b>"+data[i].deviceId+ "</p>";
        }
        getAllEmployees.innerHTML = allEmployees;
    }
}
function deleteDevice()
{
    var deviceId = document.getElementById("deleteDeviceId").value;
    var xmlRequest = ajaxFunction('DELETE','http://localhost:8080/restapi/device/'+deviceId);
    xmlRequest.send();
    xmlRequest.onload = function ()
    {
        alert("deleted successfully");
    }
}
function mapEmployeeDevice()
{
    var employeeId = document.getElementById("mapEmployeeId").value;
    var deviceId = document.getElementById("mapDeviceId").value;
    
    var xmlRequest = ajaxFunction('POST','http://localhost:8080/restapi/employee/'+employeeId+"/"+deviceId);
    xmlRequest.send();
    xmlRequest.onload = function()
    {
        if(xmlRequest.status == 200)
        {
            alert("mapped successfully");
            getLaptopCount();
            getAllDevices();
            getNumberOfDevices();
            getHeadsetCount();
            getLaptopCount();
            getAllEmployees(); 
            
        }
        else if(xmlRequest.status == 204)
        {
            alert("error 204 : no such device found");
        }
        else if(xmlRequest.status == 409)
        {
            var responseText = JSON.parse(xmlRequest.responseText);
            alert("Already mapped with :"+JSON.parse(xmlRequest.responseText).name+" Id : "+JSON.parse(xmlRequest.responseText).id);
        }
    }

}
function addEmployee()
{
    
    var employeeName = document.getElementById("addEmployeeName").value;
    var xmlRequest = ajaxFunction('POST','http://localhost:8080/restapi/employee');
    var data = { name : employeeName};
    var toSend = JSON.stringify(data);
    console.log(toSend);
    xmlRequest.setRequestHeader("Content-Type","application/json");
    xmlRequest.send(toSend);
    xmlRequest.onload = function ()
    {
        alert("employee added successfully");
    }
}
function removeDevice()
{
    var deviceId = document.getElementById("removeMapDeviceId").value;
    var employeeId = document.getElementById("removeMapEmployeeId").value;
    var xmlRequest = ajaxFunction('POST','http://localhost:8080/restapi/employee/removeMapping/'+employeeId+'/'+deviceId);
    xmlRequest.send();
    xmlRequest.onload = function ()
    {
        alert("removed mapping");
        getLaptopCount();
    }
}
function getLaptopCount()
{
    var laptopCountDiv = document.getElementById("laptopCount");
    var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/device/laptopCount');
    xmlRequest.send();
    xmlRequest.onload = function ()
    {
        laptopCountDiv.innerHTML = xmlRequest.responseText;
    }
}
function getHeadsetCount()
{
    var headsetCountDiv = document.getElementById("headsetCount");
    var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/device/headsetCount');
    xmlRequest.send();
    xmlRequest.onload = function ()
    {
        headsetCountDiv.innerHTML = xmlRequest.responseText;
    }
}
function getMonitorCount()
{
    var monitorCountDiv = document.getElementById("monitorCount");
    var xmlRequest = ajaxFunction('GET','http://localhost:8080/restapi/device/monitorCount');
    xmlRequest.send();
    xmlRequest.onload = function ()
    {
        monitorCountDiv.innerHTML = xmlRequest.responseText;
    }
}
