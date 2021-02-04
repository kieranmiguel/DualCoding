<script lang="ts">

    function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

let ID = getRandomInt(1000);
var connectID:number = 0;
var text:number;
let dotdotdot:String;
let connecting = true
let members: Array<{ID:number, connected:boolean}> = [];
    members = [{ID:33, connected:true}, {ID:46, connected:true}, {ID:59, connected:true}];

    


</script>
<style>
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

<button>Start/Stop Sharing</button>

</div>


	


