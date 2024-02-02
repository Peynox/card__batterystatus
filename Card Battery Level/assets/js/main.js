/* BATTERY */
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
            batteryStatus = document.querySelector('.battery__status'),
            batteryPercentage = document.querySelector('.battery__percentage')

    navigator.getBattery().then((batt) =>{
        updateBattery = () =>{
            /* 1. We update the number level of battery */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level+ '%'

            /* 2. We update the background level of battery */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* 3. Ww validate full battery, low battery and if it is charging */
            if(level == 100){ /* We validate if the battery is full */
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = '103%' /* to hide the ellipse */
            }
            else if(level <= 20 &! batt.charging){ /* we validate if the battery is low */
            batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
            }
            else if(batt.charging){ /* we validate if the battery is charging */
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
            }
            else{ /* If its not loading, dont show anything */
                batteryStatus.innerHTML = ''
            }
            
            /* 4. We change the colors and remove the others */
            if(level <= 20){
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange', 'gradient-color-yellow', 'gradient-color-green')
            }
            else if(level <= 40){
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-yellow', 'gradient-color-green')
            }
            else if(level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-yellow') 
            }
        }
        updateBattery()

        /* 5. Battery status events */
        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})
    })
}