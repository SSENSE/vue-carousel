{
    'conditions': [
        ['OS=="mac" or OS=="solaris" or OS=="freebsd"', {
            'conditions' : [
                ['OS=="mac" or OS=="solaris"', {
                    'variables': {
                        'escaped_root': '<!(printf %q "<(module_root_dir)")',
                    }
                }],
                ['OS=="freebsd"', {
                    'variables' : {
                        'escaped_root': '<!(printf %s "<(module_root_dir)")'
                    }
                }]
            ],

            # If we are on Mac OS X, FreeBSD, or a Solarish system, attempt
            # to build the DTrace provider extension.

            'targets': [
                {
                    'target_name': 'DTraceProviderBindings',
                    'sources': [
                        'dtrace_provider.cc',
                        'dtrace_probe.cc',
                        'dtrace_argument.cc'
                    ],
                    'conditions': [
                        ['OS=="mac" or OS=="solaris"',
                            { 'include_dirs': [
                                 'libusdt',
                                 '<!(node -e "require(\'nan\')")',
                              ]
                            }
                        ],
                        ['OS=="freebsd"',
                            { 'include_dirs': [
                                  '/usr/src/cddl/compat/opensolaris/',
                                  '/usr/src/sys/cddl/compat/opensolaris',
                                  '/usr/src/sys/cddl/contrib/opensolaris/uts/common/',
                                  'libusdt',
                                  '<!(node -e "require(\'nan\')")'
                              ]
                            }
                        ]
                    ],
                    'dependencies': [
                        'libusdt'
                    ],
                    'libraries': [
                        '-L<(escaped_root)/libusdt -l usdt'
                    ]
                },
                {
                    'target_name': 'libusdt',
                    'type': 'none',
                    'actions': [{
                        'inputs': [''],
                        'outputs': [''],
                        'action_name': 'build_libusdt',
                        'action': [
                            'sh', 'libusdt-build.sh'
                        ]
                    }]
                }
            ]
        },

        # If we are not on Mac OS X, FreeBSD or a Solarish system, DTrace is
        # unavailable. This target is necessary because GYP requires at least
        # one target to exist.

        {
            'targets': [
                {
                    'target_name': 'DTraceProviderStub',
                    'type': 'none'
                }
            ]
        }],
    ]
}
