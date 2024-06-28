<script setup>
</script>

<template>
    <div class="container-perfil">
        <div class="perfil flex flex-col gap-[17px] items-center">
            <div class="flex justify-center items-center oval w-[80px] h-[80px] border border-color-primary rounded-full ">
                <img class="img-logo" src="https://4.bp.blogspot.com/-oyzJQ9glbYI/V0Y4f08QC5I/AAAAAAAAxdc/4ILEsz1KLo8LVLKLvCd9yVJMepuGfSTPQCLcB/s640/ie-00884-los-olivos-insignia.jpg" alt="">
            </div>
            <h1 class="uppercase title">los olivos</h1>
        </div>
        <div class="container-form">
            <form action="" class="form">
                <div class="section-1">
                    <div class="container-input">
                        <label for="">código CT</label>
                        <input type="text" name="" id="" placeholder="Codigo CT">
                    </div>
                    <div class="container-input">
                        <label for="">nombre</label>
                        <input type="text" name="" id="" placeholder="Codigo CT">
                    </div>
                </div>
                <div class="section-2">
                    <div class="inputs">
                        <div class="container-input">
                            <label for="">director</label>
                            <input type="text" name="" id="" placeholder="Codigo CT">
                        </div>
                        <div class="container-input">
                            <label for="">email</label>
                            <input type="text" name="" id="" placeholder="Codigo CT">
                        </div>
                        <div class="container-input">
                            <label for="">contraseña</label>
                            <input type="text" name="" id="" placeholder="Codigo CT">
                        </div>
                    </div>
                    <div class="container-input">
                        <label for="">historia</label>
                        <textarea name="" id="" class="textarea"></textarea>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.img-logo{
    width: 50px;
}
.container-perfil {
    background: #fff;
    padding: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 39px;
}

.title {
    color: #4379EE;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.538px;
}

.section-1 {
    display: flex;
    gap: 60px;
}

.section-2 {
    display: flex;
    gap: 60px;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 60px;
}

.container-input {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

.container-input label {
    text-transform: uppercase;
    color: #606060;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.container-input input {
    background: #F5F6FA;
    border: 1px #D5D5D5 solid;
    border-radius: 8px;
    width: 360px;
    height: 52px;
}

.container-input textarea {
    background: #F5F6FA;
    border: 1px #D5D5D5 solid;
    border-radius: 8px;
    width: 360px;
    height: 100%;
    resize: none;
}

@media screen and (max-width: 700px) {
    .inputs{
        gap: 30px;
    }
    .form{
        gap: 30px;
    }
    .section-1 {
        flex-direction: column;
        gap: 30px
    }

    .section-2 {
        flex-direction: column;
        gap: 30px;
    }
    
}

@media screen and (max-width: 1000px) {
    .container-input input {
        width: auto;
    }

    .container-input textarea {
        width: auto;
    }
}
</style>