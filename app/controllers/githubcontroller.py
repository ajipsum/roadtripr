from github3 import login
import configparser


class GithubController:
    '''
    '''
    def __init__(self):
        config = configparser.ConfigParser()
        config.read('config.ini')

        gh = login(token=config['GITHUB']['ACCESS_TOKEN'])
        self.repo = gh.repository('Magana', 'roadtripr')


    def get_issue_counts(self):
        issue_counts = dict()
        issues = self.repo.issues(state='all')

        for i in issues:
            user = str(i.user)
            if user in issue_counts:
                issue_counts[user] += 1
            else:
                issue_counts[user] = 1

        return issue_counts


    def get_commit_counts(self):
        commit_counts = dict()
        commits = self.repo.commits()

        for c in commits:
            user = str(c.author)
            if user in commit_counts:
                commit_counts[user] += 1
            else:
                commit_counts[user] = 1

        return commit_counts

