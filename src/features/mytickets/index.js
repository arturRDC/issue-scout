import MyTickets from './components/MyTickets';

function Tickets() {

  return (
    <>
      <div className='pt-2'>
        <div role='tablist' className='tabs tabs-lifted'>
          <input
            type='radio'
            name='my_tabs_2'
            role='tab'
            className='tab'
            aria-label='Tickets'
            defaultChecked
          />
          <div
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box'
          >
            <div className='card w-full'>
              <div className='card-body'>
                <div className='text-xl font-semibold'>My tickets</div>
                <div className='divider mt-2'></div>
                <MyTickets></MyTickets>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tickets;
