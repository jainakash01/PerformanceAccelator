import os.path
import site
import sys

def add(path, index = None):
    site_dir = os.path.join(path, 'lib', 'python' + sys.version[:3], 'site-packages')
    if os.path.exists(site_dir):
        path = site_dir
    else:
        path = os.path.join(os.path.dirname(__file__), path)

    sys.path, rest = sys.path[:1], sys.path[1:]
    site.addsitedir(path)
    sys.path.extend(rest)

