import { shallowMount } from '@vue/test-utils' 
import AddComputer from '../../src/components/AddComputer'
import ComputersApi from '../../src/api/computers_api'
import ComputerList from '../../src/components/ComputerList'

describe('AddComputer', () => {
    // Now mount the component and you have the wrapper
    
    const wrapperComputersApi = shallowMount(ComputersApi)
    const wrapper = shallowMount(AddComputer)
    const wrapperComputerList = shallowMount(ComputerList)
    var nbComputers = 0
    var nbComputersAfterAdd = 0
    it('renders the correct markup', () => {
      expect(wrapper.html()).toContain('<h1>ADD COMPUTER FORM</h1>')
    })
  
    // it's also easy to check for the existence of elements
    it('has a div', () => {
      expect(wrapper.contains('div')).toBe(true)
    })

    it('verify add', () => {
        console.log(wrapperComputerList.vm.getUrlFirstSearch())
        nbComputers = wrapper.vm.getFindAllLength();
        const  vbtn = wrapper.find('#validate')
        vbtn.trigger('click')
        console.log(wrapper.vm.getFindAllLength());
        nbComputersAfterAdd = wrapper.vm.getFindAllLength();
        //expect(nbComputersAfterAdd).toBe(nbComputers+1)
      })
      


  })