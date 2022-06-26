import { ref } from 'vue'

const order = ref({} as any)

const completeOrder = () => {
  order.value.status = 'paid'
}
