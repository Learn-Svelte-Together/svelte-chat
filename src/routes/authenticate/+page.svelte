<script lang="ts">
	import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";

    let activeForm: 'none' | 'login' | 'register' = $state('none');

    function toggleForm(form: 'login' | 'register') {
        activeForm = activeForm === form ? 'none' : form;
    };

</script>

<div class="flex flex-col w-[60%] p-8 max-h-screen min-h-screen bg-[#FDF0E8]">
    <h1 class="text-xl text-left">Demo Chat</h1>
    <img src="/Alf.png" alt="alf" class="m-auto" />
</div>

<div class="flex flex-col gap-4 text-center w-[40%] max-h-screen min-h-screen bg-white">
    <div class="flex flex-col gap-8 m-auto min-w-[60%]">
      {#if activeForm === 'none'}
        <h1 class="text-3xl font-bold text-gray-800">Get Chatting!</h1>
        <div class="flex flex-row gap-4 mx-auto">
          <Button text="Log In" onClick={() => toggleForm('login')} />
          <Button text="Register" onClick={() => toggleForm('register')} />
        </div>
      {:else if activeForm === 'register'}
        <h1 class="text-3xl font-bold text-gray-800">Register</h1>
        <p class="text-gray-600">
          Already have an account?
          <button type='button' class="underline text-blue-600 hover:text-blue-800" onclick={() => toggleForm('login')}>
            Sign In
          </button>
        </p>
        <form
          class="flex flex-col gap-4 w-full"
          action="?/register"
          method="post"
          use:enhance={() => {
            return async ({ result, update }) => {
              if (result.type === 'success') {
                toggleForm('login');
                await update();
              }
            }
          }}
        >
          <div class="flex flex-col gap-1">
            <label for="name" class="text-left text-gray-700">Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" class="bg-gray-100 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="flex flex-col gap-1">
            <label for="username" class="text-left text-gray-700">Username</label>
            <input type="text" id="username" name="username" placeholder="johndoe" class="bg-gray-100 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="flex flex-col gap-1">
            <label for="email" class="text-left text-gray-700">Email</label>
            <input type="email" id="email" name="email" placeholder="john@example.com" class="bg-gray-100 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="flex flex-col gap-1">
            <label for="password" class="text-left text-gray-700">Password</label>
            <input type="password" id="password" name="password" placeholder="••••••••" class="bg-gray-100 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="flex flex-col gap-1">
            <label for="passwordConfirm" class="text-left text-gray-700">Confirm Password</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="••••••••" class="bg-gray-100 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <button type="submit" class="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors mx-auto">Register</button>
        </form>
      {:else}
        <h1 class="text-3xl font-bold text-gray-800">Log In</h1>
        <p class="text-gray-600">
          Don't have an account?
          <button type='button' class="underline text-blue-600 hover:text-blue-800" onclick={() => toggleForm('register')}>
            Register
          </button>
        </p>
        <form
          class="flex flex-col gap-4 w-full"
          action="?/login"
          method="post"
          use:enhance
        >
          <div class="flex flex-col gap-1">
            <label for="identity" class="text-left text-gray-700">Username or Email</label>
            <input type="text" id="identity" name="identity" placeholder="johndoe or john@example.com" class="bg-gray-100 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="flex flex-col gap-1">
            <label for="loginPassword" class="text-left text-gray-700">Password</label>
            <input type="password" id="loginPassword" name="password" placeholder="••••••••" class="bg-gray-100 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <button type="submit" class="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors mx-auto">Log In</button>
        </form>
      {/if}
    </div>
  </div>