<script lang="ts">
import {TextWatcher}  from '../../src/components/TextWatcher';

    function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const textwatcher = new TextWatcher();
    

let ID = getRandomInt(1000);
var connectID:number = 0;
var text:number;
let dotdotdot:String;
let connecting = true
let members: Array<{ID:number, connected:boolean}> = [];
    members = [{ID:33, connected:true}, {ID:46, connected:true}, {ID:59, connected:true}];
let sharingString = 'Start Sharing'
let color = '#0db82f';
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

    h3{
        margin-left:auto;
        margin-right:auto;
        margin-top: 1vh;
        color: rgb(9, 192, 9);
    }
    
</style>

<div>
 <p>ID : {ID} </p>
 <hr>
 <p>Connections ID: {connectID} </p>

<form
    on:submit|preventDefault={() => {
        connectID = text;
        
    }}>
    <input type="number" bind:value = {text} />
</form>



<p>Lobby</p>
<ul>
    {#each members as member (member.ID)}   
        
            <li> ID: {member.ID}</li>
        
    {/each}
</ul>

<button on:click={sharing} style="--theme-color: {color}" >{sharingString}</button>


</div>


	


