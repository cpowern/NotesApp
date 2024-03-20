const dashboardController = require('../server/controllers/dashboardController');

describe('dashboard controller', () => {
  test('renders dashboard correctly', async () => {
    const req = {
      query: {
        page: 1 
      },
      user: {
        id: 'user_id'
      }
    };

    const res = {
      render: jest.fn()
    };

    const Note = require('../server/models/Notes');
    Note.aggregate = jest.fn().mockResolvedValue([]);
    Note.countDocuments = jest.fn().mockResolvedValue(0);

    await dashboardController.dashboard(req, res);

    expect(res.render).toHaveBeenCalledWith('dashboard/index', {
      userName: req.user.firstName,
      locals: {
        title: 'Dashboard',
        description: 'Free NodeJS Notes App.'
      },
      notes: [],
      layout: '../views/layouts/dashboard',
      current: req.query.page,
      pages: 1
    });
  });

});
