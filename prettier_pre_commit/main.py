#!/usr/bin/env python3
"""Pre-commit hook that runs prettier on supported file types."""

import argparse
import subprocess
import sys
from typing import List, Optional, Sequence


def run_prettier(files: List[str], write: bool = True) -> int:
    """Run prettier on the specified files.
    
    Args:
        files: List of file paths to format
        write: If True, write changes to files. If False, only check formatting.
    
    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    if not files:
        return 0
    
    cmd = ["npx", "--yes", "prettier"]
    
    if write:
        cmd.append("--write")
    else:
        cmd.append("--check")
    
    cmd.extend(files)
    
    try:
        result = subprocess.run(cmd, check=False)
        return result.returncode
    except FileNotFoundError:
        print("Error: npx not found. Please install Node.js and npm.", file=sys.stderr)
        return 1


def main(argv: Optional[Sequence[str]] = None) -> int:
    """Main entry point for the prettier pre-commit hook.
    
    Args:
        argv: Command line arguments
    
    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    parser = argparse.ArgumentParser(
        description="Run prettier on files"
    )
    parser.add_argument(
        "filenames",
        nargs="*",
        help="Filenames to format"
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check if files are formatted without writing changes"
    )
    
    args = parser.parse_args(argv)
    
    return run_prettier(args.filenames, write=not args.check)


if __name__ == "__main__":
    sys.exit(main())
