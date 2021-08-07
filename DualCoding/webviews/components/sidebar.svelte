<script lang="ts">


import { onMount } from "svelte";


let accessToken = "";
let loading = true;
let ID = 0;
let name = '';
let loggedin = false; 


onMount(async () => {
        window.addEventListener("message", async (event) => {
            const message = event.data;
            switch (message.type) {
                case "token":
                    accessToken = message.value;
                    const response = await fetch(`http://localhost:3002/me`, {
                        headers: {
                            authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    console.dir(data.user1);
                    ID = data.user1.id;
                    name = data.user1.name;
                    loggedin = true; 
                    loading = false;
            }
        });
        tsvscode.postMessage({type: "get-token", value: undefined});
    });


tsvscode.postMessage({type: "get-token", value:undefined })


async function http(
			request: RequestInfo,
		  ): Promise<any> {
			const response = await fetch(request, {
            });
			const body = await response.json();
			return body;
		  }
	  



    


//tsvscode.setAcceptingState(false);
//tsvscode.setSharingState(false);


var connectID:number = 0;
var text:number;
let members: Array<{ID:number, connected:boolean}> = [];
    members = [{ID:33, connected:true}, {ID:46, connected:true}, {ID:59, connected:true}];
let sharingString = 'Start Sharing'
let acceptingString = 'Start Accepting'
let color = '#0db82f';
let color2 = '#0db82f';
function sharing() {
    if(sharingString == 'Start Sharing'){
        sharingString = 'Stop Sharing'
        color = '#ff3e00';
  //      tsvscode.setSharingState(false);
        
    }
    else if(sharingString == 'Stop Sharing'){
        sharingString = 'Start Sharing'
        color = '#0db82f';
    //  tsvscode.setSharingState(true);
    }
}
function accepting(){
    if(acceptingString == 'Start Accepting'){
        acceptingString = 'Stop Accepting'
        color2 = '#ff3e00';
      //  tsvscode.setAcceptingState(false);
    }
    else if(acceptingString == 'Stop Accepting'){
        acceptingString = 'Start Accepting'
        color2 = '#0db82f';
        //tsvscode.setAcceptingState(true);
    }
}


</script>
<style>

button {
		background-color: var(--theme-color);
	}
   p{
       font-size: large;
       padding:1vh;
   }
    ul{
        margin-top: 1vh;
        margin-bottom:2vh;
        list-style-type: none;
    }
    li{
        padding:1vh;
        font-size: large;

    }
    div{
        padding:1vh;
    }

    
    
</style>

    {#if loading}
<div> loading... </div>
    {:else if loggedin}
<div>
 <p>Hello {name} </p>
 <p>ID : {ID} </p>
 <hr>
 <p>Connections ID: {connectID} </p>

<form
    on:submit|preventDefault={async () => {
        console.log(text)
        const data = await http(
			`http://localhost:3002/Users?id=${text}`,
			
		  );
        
          connectID = data.auser[0].id
        
    }}>
    <input type="number" bind:value = {text} />
</form>

<button on:click={accepting} style="--theme-color: {color2}" >{acceptingString}</button>

<hr/>



<button on:click={sharing} style="--theme-color: {color}" >{sharingString}</button>

<br>
<!-- svelte-ignore missing-declaration -->
<button on:click={() => {
    loggedin = false;
    name = '';
    ID = 0;
    accessToken = ''
    tsvscode.postMessage({type: "log-out", value: undefined});
}} style="--theme-color: #0078d7 --padding: 20dp" >Log Out</button>
</div>
{:else}
    

     <!-- svelte-ignore missing-declaration -->
     <button on:click={() => {
         tsvscode.postMessage({type: "authenticate", value: undefined});
     }}
     style="--theme-color: #0078d7 --padding: 20dp" >Log In with Github</button>

 {/if}


	


