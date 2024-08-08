<script lang="ts">
    import { onMount } from 'svelte';
    
    let message = $state("");
    let messages = $state<string[]>([]);
    let isFlying = $state(false);
    
    function send(e: Event) {
        e.preventDefault();
        if (message.trim() !== "") {
            messages = [...messages, message];
            message = "";
            animateIcon();
        }
    }
    
    function animateIcon() {
        isFlying = true;
        setTimeout(() => {
            isFlying = false;
        }, 500);
    }
    
    onMount(() => {
        const input = document.getElementById('message_fld');
        if (input) {
            input.focus();
        }
    });
</script>

<div class="chat-container">
    <div id="messages">
        {#each messages as message}
            <p>{message}</p>
        {/each}
    </div>
    <form id="chat_input" onsubmit={send}>
        <input id="message_fld" name="message_fld" bind:value={message}>
        <button id="send_btn" type="submit">
            <span class="icon" class:flying={isFlying}>🚀</span>
        </button>
    </form>
</div>

<style>
    .chat-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding: 16px;
    }

    #messages {
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
    }

    #messages p {
        padding: 16px;
        margin: 0;
        width: max-content;
        background-color: #4e4e4e;
        color: #02fe0b;
        margin-bottom: 16px;
        border-radius: 16px;
    }

    #chat_input {
        display: flex;
        margin-top: auto;
        margin-bottom: 16px;
    }

    input {
        padding: 16px;
        border: none;
        outline: none;
        width: 100%;
        margin-right: 16px;
        border-radius: 16px;
    }

    button {
        margin-left: auto;
        background-color: #fff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
    }

    .icon {
        transition: opacity 0.3s ease-in-out;
    }

    .flying {
        animation: fly-off 0.5s ease-out forwards;
    }

    @keyframes fly-off {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(100px, -100px) scale(0.5);
            opacity: 0;
        }
    }

    button:hover .icon:not(.flying) {
        animation: shake 0.5s infinite;
    }

    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
</style>