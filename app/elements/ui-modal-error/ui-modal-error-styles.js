import { css } from 'lit-element';

export default css `
  :host {
    display: none;
    width: 72%;
    max-width: 32rem;
    height: 40%;
    border: .5rem solid #f61851;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 3; 
    transform: translate(-50%, -50%);
    overflow: hidden;
    background: rgb(190,240,244);
    background: linear-gradient(120deg, rgba(190,240,244,1) 0%, rgba(28,167,188,1) 67%);
    border-radius: 2rem;
    box-shadow: 8px 8px 24px white;
  }

  .container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .modal-title {
    color: #fff;
  }

  .modal-close {
    border: none;
    padding: .5rem 1rem;
    background-color: #f9ed62;
    font-weight: 700;
    border-radius: .5rem;
  }
  
  .modal-close:hover {
    background-color: #f7f2be;
  }  
`;