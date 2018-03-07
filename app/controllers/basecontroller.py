import configparser


class BaseController(object):
    '''
    Base class for all controller classes.
    '''

    def __init__(self):
        '''
        Read configuration file and store in self._config.
        '''
        self._config = configparser.ConfigParser()
        self._config.read('config.ini')
