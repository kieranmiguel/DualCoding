<script lang="ts">
import { dataset_dev } from "svelte/internal";
import { getContext, setContext } from 'svelte'
//import type {ServerData} from '../../src/globals'
//import type {PageData} from '../../src/globals'

async function http(
			request: RequestInfo,
		  ): Promise<any> {
			const response = await fetch(request, {
            });
			const body = await response.json();
			return body;
		  }
	  



    function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}



let ID = getRandomInt(1000);
setContext('TextWatcherEnable', false)
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
        
    }
    else if(sharingString == 'Stop Sharing'){
        sharingString = 'Start Sharing'
        color = '#0db82f';
    }
}
function accepting(){
    if(acceptingString == 'Start Accepting'){
        acceptingString = 'Stop Accepting'
        color2 = '#ff3e00';
        
    }
    else if(acceptingString == 'Stop Accepting'){
        acceptingString = 'Start Accepting'
        color2 = '#0db82f';
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

<div>
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

<p>Lobby</p>
<ul>
    {#each members as member (member.ID)}   
        
            <li> ID: {member.ID}</li>
        
    {/each}
</ul>

<button on:click={sharing} style="--theme-color: {color}" >{sharingString}</button>


</div>


	


