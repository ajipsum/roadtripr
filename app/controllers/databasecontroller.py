from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from controllers.basecontroller import BaseController

class DatabaseController(BaseController):
    '''
    Controller for mySQL Database.
    '''

    def __init__(self):
        super(DatabaseController, self).__init__()

        user = 'root'
        password = 'arewethereyet'
        db_name = 'rtdb'
        self.engine = create_engine('mysql+pymysql://'+user+':'+password+'@localhost/'+db_name, pool_pre_ping=True)
        DBSession = sessionmaker(bind=self.engine, autocommit=True)
        self.session = DBSession()

    def get_engine(self):
        '''
        Return the engine
        '''
        return self.engine


    def get_session(self):
        '''
        Return the session
        '''
        return self.session
